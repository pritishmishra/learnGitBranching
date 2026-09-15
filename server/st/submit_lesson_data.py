#!/usr/bin/env python3
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path


LOG_PATH = Path(os.environ.get("LESSON_DATA_LOG_PATH", "/var/log/learngit/lesson_data.jsonl"))
VALID_LESSON_IDS = {
    "local1",
    "local2",
    "local3",
    "local4",
    "local5",
    "local6",
    "branchMerge1",
    "branchMerge2",
    "branchMerge3",
    "branchMerge4",
    "mistakes1",
    "mistakes2",
    "mistakes3",
    "mistakes4",
    "team1",
    "team2",
    "team3",
    "team4",
    "team5",
}


def respond(status, payload):
    print("Status: " + status)
    print("Content-Type: application/json")
    print()
    print(json.dumps(payload, sort_keys=True))


def get_identity():
    env = os.environ
    return {
        "username": env.get("utorid") or env.get("REMOTE_USER") or env.get("mail") or "",
        "utorid": env.get("utorid") or "",
        "mail": env.get("mail") or "",
        "remote_user": env.get("REMOTE_USER") or "",
        "ip": env.get("REMOTE_ADDR") or "",
        "user_agent": env.get("HTTP_USER_AGENT") or "",
    }


def read_request_body():
    try:
        length = int(os.environ.get("CONTENT_LENGTH") or "0")
    except ValueError:
        length = 0

    return sys.stdin.read(length)


def main():
    if os.environ.get("REQUEST_METHOD") != "POST":
        respond("405 Method Not Allowed", {
            "error": "POST required",
        })
        return

    try:
        body = json.loads(read_request_body() or "{}")
    except json.JSONDecodeError:
        respond("400 Bad Request", {
            "error": "Invalid JSON",
        })
        return

    completed = body.get("completed")
    if not isinstance(completed, list):
        respond("400 Bad Request", {
            "error": "completed must be a list",
        })
        return

    cleaned = []
    for item in completed:
        if not isinstance(item, str) or item not in VALID_LESSON_IDS:
            respond("400 Bad Request", {
                "error": "Invalid lesson id: " + str(item),
            })
            return
        if item not in cleaned:
            cleaned.append(item)

    record = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "completed": cleaned,
        "count": len(cleaned),
    }
    record.update(get_identity())

    try:
        LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with LOG_PATH.open("a", encoding="utf-8") as log_file:
            log_file.write(json.dumps(record, sort_keys=True) + "\n")
    except OSError as exc:
        respond("500 Internal Server Error", {
            "error": "Could not write lesson data",
            "detail": str(exc),
        })
        return

    payload = dict(record)
    payload["ok"] = True
    respond("200 OK", payload)


if __name__ == "__main__":
    main()
