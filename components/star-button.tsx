"use client";

import { useEffect, useState } from "react";

const STARRED_KEY = "utac-starred-alumni";
const CLIENT_ID_KEY = "utac-browser-id";

type StarButtonProps = {
  alumniId: string;
  initialStarCount: number;
};

function readStarredSet(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const stored = window.localStorage.getItem(STARRED_KEY);
    if (!stored) {
      return new Set();
    }

    return new Set(JSON.parse(stored) as string[]);
  } catch {
    return new Set();
  }
}

function writeStarredSet(value: Set<string>) {
  window.localStorage.setItem(STARRED_KEY, JSON.stringify([...value]));
}

function getClientId(): string {
  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) {
    return existing;
  }

  const created = crypto.randomUUID();
  window.localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

export default function StarButton({ alumniId, initialStarCount }: StarButtonProps) {
  const [starCount, setStarCount] = useState(initialStarCount);
  const [isReady, setIsReady] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const starred = readStarredSet();
    setIsStarred(starred.has(alumniId));
    setIsReady(true);
  }, [alumniId]);

  async function handleStar() {
    if (isPending || isStarred) {
      return;
    }

    setIsPending(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/alumni/${alumniId}/star`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientId: getClientId()
        })
      });

      const payload = (await response.json()) as { status: "awarded" | "duplicate"; starCount: number } | { message: string };

      if (!response.ok && !("status" in payload && payload.status === "duplicate")) {
        throw new Error("message" in payload ? payload.message : "Unable to award a star right now.");
      }

      if ("status" in payload) {
        const starred = readStarredSet();
        starred.add(alumniId);
        writeStarredSet(starred);
        setIsStarred(true);
        setStarCount(payload.starCount);
        setMessage(payload.status === "awarded" ? "Star added" : "Already starred from this browser");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to award a star right now.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleStar}
        disabled={!isReady || isPending || isStarred}
        className="rounded-full border border-burnt/20 bg-burnt px-4 py-2 text-sm font-semibold text-white transition hover:bg-ember disabled:cursor-not-allowed disabled:border-burnt/10 disabled:bg-sand disabled:text-slate/50"
      >
        {isPending ? "Saving..." : isStarred ? `Starred • ${starCount}` : `Give a star • ${starCount}`}
      </button>
      {message ? <p className="text-xs text-slate/70">{message}</p> : null}
    </div>
  );
}

