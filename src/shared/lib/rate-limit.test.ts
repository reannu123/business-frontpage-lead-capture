import { describe, expect, it, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimitForTests } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitForTests();
  });

  it("allows requests until the limit is reached", () => {
    expect(checkRateLimit("lead:test", 2, 60_000).allowed).toBe(true);
    expect(checkRateLimit("lead:test", 2, 60_000).allowed).toBe(true);
    expect(checkRateLimit("lead:test", 2, 60_000).allowed).toBe(false);
  });

  it("keeps separate buckets per key", () => {
    expect(checkRateLimit("lead:a", 1, 60_000).allowed).toBe(true);
    expect(checkRateLimit("lead:a", 1, 60_000).allowed).toBe(false);
    expect(checkRateLimit("lead:b", 1, 60_000).allowed).toBe(true);
  });
});
