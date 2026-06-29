export function secondsToTime(value: string) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return "Instant / disabled";

  const days = seconds / 86400;
  if (days >= 1) return `${days.toFixed(days % 1 === 0 ? 0 : 1)} day(s)`;

  const hours = seconds / 3600;
  if (hours >= 1) return `${hours.toFixed(hours % 1 === 0 ? 0 : 1)} hour(s)`;

  const minutes = seconds / 60;
  if (minutes >= 1) {
    return `${minutes.toFixed(minutes % 1 === 0 ? 0 : 1)} minute(s)`;
  }

  return `${seconds} second(s)`;
}

export function analyzeValue(label: string, value: string) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return {
      label: "Invalid",
      color: "red",
      message: `${label} should be a number.`,
    };
  }

  if (label === "Nominal") {
    if (number === 0) {
      return {
        label: "Disabled",
        color: "blue",
        message: "This item is disabled. Common on custom servers.",
      };
    }

    if (number >= 500) {
      return {
        label: "Risky",
        color: "red",
        message: "Very high spawn target. Could flood loot economy.",
      };
    }

    if (number >= 100) {
      return {
        label: "Boosted",
        color: "yellow",
        message: "Higher than typical vanilla-style values.",
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: "Normal-looking spawn target.",
    };
  }

  if (label === "Minimum") {
    if (number < 0) {
      return {
        label: "Risky",
        color: "red",
        message: "Minimum should not be negative.",
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: "Valid refill threshold.",
    };
  }

  if (label === "Lifetime") {
    if (number === 0) {
      return {
        label: "Warning",
        color: "yellow",
        message: "Lifetime is 0. Item may despawn instantly or behave oddly.",
      };
    }

    if (number > 604800) {
      return {
        label: "Risky",
        color: "red",
        message: `Very long lifetime: ${secondsToTime(value)}.`,
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: `Despawns after ${secondsToTime(value)}.`,
    };
  }

  if (label === "Restock") {
    if (number === 0) {
      return {
        label: "Instant",
        color: "green",
        message: "Instant restock allowed.",
      };
    }

    return {
      label: "Healthy",
      color: "green",
      message: `Restock delay: ${secondsToTime(value)}.`,
    };
  }

  return {
    label: "Info",
    color: "blue",
    message: "Reference value.",
  };
}

export function badgeClass(color: string) {
  if (color === "red") return "border-red-500/50 bg-red-500/10 text-red-200";
  if (color === "yellow") {
    return "border-yellow-500/50 bg-yellow-500/10 text-yellow-200";
  }
  if (color === "green") {
    return "border-emerald-500/50 bg-emerald-500/10 text-emerald-200";
  }

  return "border-blue-500/50 bg-blue-500/10 text-blue-200";
}