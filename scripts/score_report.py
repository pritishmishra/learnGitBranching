#!/usr/bin/env python3
import argparse
import csv
import json
import sys
from datetime import datetime, timezone


DEFAULT_LOGFILE = "/var/log/learngit/submissions.jsonl"


def parse_timestamp(value):
    if not value:
        return datetime.min.replace(tzinfo=timezone.utc)

    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return datetime.min.replace(tzinfo=timezone.utc)


def read_lines(path):
    if path == "-":
        yield from sys.stdin
        return

    with open(path, "r", encoding="utf-8", errors="replace") as f:
        yield from f


def student_id(record):
    return (
        record.get("utorid") or
        record.get("username") or
        record.get("mail") or
        record.get("remote_user") or
        "unknown"
    )


def completed_list(record):
    completed = record.get("completed")
    if isinstance(completed, list):
        return [str(item) for item in completed]
    return []


def normalized_record(record, line_number):
    completed = completed_list(record)
    return {
        "student_id": student_id(record),
        "username": record.get("username") or "",
        "utorid": record.get("utorid") or "",
        "mail": record.get("mail") or "",
        "timestamp": record.get("timestamp") or "",
        "parsed_timestamp": parse_timestamp(record.get("timestamp")),
        "count": len(completed),
        "completed": completed,
        "ip": record.get("ip") or "",
        "line_number": line_number,
    }


def better_record(existing, candidate, mode):
    if existing is None:
        return candidate

    if mode == "latest":
        if candidate["parsed_timestamp"] != existing["parsed_timestamp"]:
            return (
                candidate
                if candidate["parsed_timestamp"] > existing["parsed_timestamp"]
                else existing
            )
        return candidate if candidate["line_number"] > existing["line_number"] else existing

    if candidate["count"] != existing["count"]:
        return candidate if candidate["count"] > existing["count"] else existing

    if candidate["parsed_timestamp"] != existing["parsed_timestamp"]:
        return (
            candidate if candidate["parsed_timestamp"] > existing["parsed_timestamp"]
            else existing
        )

    return candidate if candidate["line_number"] > existing["line_number"] else existing


def build_report(path, mode):
    selected = {}
    submissions = {}
    skipped = 0

    for line_number, line in enumerate(read_lines(path), start=1):
        line = line.strip()
        if not line:
            continue

        try:
            raw = json.loads(line)
        except json.JSONDecodeError:
            skipped += 1
            continue

        record = normalized_record(raw, line_number)
        sid = record["student_id"]
        submissions[sid] = submissions.get(sid, 0) + 1
        selected[sid] = better_record(selected.get(sid), record, mode)

    rows = []
    for sid, record in selected.items():
        rows.append({
            "student_id": sid,
            "count": record["count"],
            "completed_exercises": ";".join(record["completed"]),
            "timestamp": record["timestamp"],
            "submissions": submissions.get(sid, 0),
            "utorid": record["utorid"],
            "username": record["username"],
            "mail": record["mail"],
            "ip": record["ip"],
        })

    rows.sort(key=lambda row: (-int(row["count"]), row["student_id"]))
    return rows, skipped


def main():
    parser = argparse.ArgumentParser(
        description="Generate a CSV score report from Learn Git score submissions."
    )
    parser.add_argument(
        "logfile",
        nargs="?",
        default=DEFAULT_LOGFILE,
        help="Path to score_submissions.jsonl. Use '-' for stdin.",
    )
    parser.add_argument(
        "--mode",
        choices=["best", "latest"],
        default="best",
        help="Use each student's best submission or latest submission.",
    )
    parser.add_argument(
        "--output",
        "-o",
        default="-",
        help="Output CSV path. Defaults to stdout.",
    )
    args = parser.parse_args()

    rows, skipped = build_report(args.logfile, args.mode)
    fieldnames = [
        "student_id",
        "count",
        "completed_exercises",
        "timestamp",
        "submissions",
        "utorid",
        "username",
        "mail",
        "ip",
    ]

    output = sys.stdout if args.output == "-" else open(args.output, "w", newline="", encoding="utf-8")
    try:
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    finally:
        if output is not sys.stdout:
            output.close()

    if skipped:
        print(f"Skipped malformed JSON lines: {skipped}", file=sys.stderr)


if __name__ == "__main__":
    main()
