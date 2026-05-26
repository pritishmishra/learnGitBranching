#!/usr/bin/env python3
import argparse
import re
from collections import defaultdict
from datetime import datetime

# Matches Apache combined log with an extra final quoted username field.
# Example:
# 204.244.153.56 - "" [26/May/2026:00:45:42 -0400] "GET / HTTP/1.1" 200 10705 "-" "UA" "chenpan"
LOG_RE = re.compile(
    r'^(?P<ip>\S+)\s+'
    r'\S+\s+'
    r'(?P<remote_user>\S+)\s+'
    r'\[(?P<time>[^\]]+)\]\s+'
    r'"(?P<method>\S+)\s+(?P<path>\S+)\s+(?P<protocol>[^"]+)"\s+'
    r'(?P<status>\d{3})\s+'
    r'(?P<size>\S+)\s+'
    r'"(?P<referer>[^"]*)"\s+'
    r'"(?P<user_agent>[^"]*)"\s+'
    r'"(?P<username>[^"]*)"'
)

TIME_FORMAT = "%d/%b/%Y:%H:%M:%S %z"


def parse_time(value):
    return datetime.strptime(value, TIME_FORMAT)


def read_lines(path):
    if path == "-":
        import sys
        yield from sys.stdin
    else:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            yield from f


def main():
    parser = argparse.ArgumentParser(
        description="Parse Apache access.log and summarize Shibboleth usernames."
    )
    parser.add_argument(
        "logfile",
        nargs="?",
        default="/var/log/apache2/access.log",
        help="Path to Apache access log. Use '-' for stdin.",
    )
    parser.add_argument(
        "--only-pages",
        action="store_true",
        help="Only count page visits, not assets like JS/CSS/images/fonts.",
    )
    parser.add_argument(
        "--domain",
        default=None,
        help="Only include requests whose referer contains this domain.",
    )
    args = parser.parse_args()

    users = defaultdict(lambda: {
        "count": 0,
        "first": None,
        "last": None,
        "ips": set(),
        "paths": defaultdict(int),
    })

    skipped = 0

    static_exts = (
        ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".ico",
        ".svg", ".woff", ".woff2", ".ttf", ".eot", ".map"
    )

    for line in read_lines(args.logfile):
        line = line.rstrip("\n")
        m = LOG_RE.match(line)

        if not m:
            skipped += 1
            continue

        data = m.groupdict()
        username = data["username"].strip()

        # Skip unauthenticated or empty username records.
        if not username or username == "-":
            continue

        path = data["path"]
        referer = data["referer"]

        if args.domain and args.domain not in referer and path != "/":
            continue

        if args.only_pages and path.lower().endswith(static_exts):
            continue

        t = parse_time(data["time"])

        entry = users[username]
        entry["count"] += 1
        entry["ips"].add(data["ip"])
        entry["paths"][path] += 1

        if entry["first"] is None or t < entry["first"]:
            entry["first"] = t

        if entry["last"] is None or t > entry["last"]:
            entry["last"] = t

    print("username,count,first_visit,last_visit,ips,top_paths")

    for username, entry in sorted(
        users.items(),
        key=lambda item: item[1]["last"] or datetime.min,
        reverse=True,
    ):
        ips = ";".join(sorted(entry["ips"]))
        top_paths = ";".join(
            f"{path}:{count}"
            for path, count in sorted(
                entry["paths"].items(),
                key=lambda item: item[1],
                reverse=True,
            )[:5]
        )

        print(
            f"{username},"
            f"{entry['count']},"
            f"{entry['first'].isoformat()},"
            f"{entry['last'].isoformat()},"
            f"{ips},"
            f"{top_paths}"
        )

    if skipped:
        print(f"\nSkipped unparsable lines: {skipped}")


if __name__ == "__main__":
    main()
