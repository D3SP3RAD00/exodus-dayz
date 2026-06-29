import { SpawnableTypeItem } from "../parser/spawnableTypesParser";

export type SpawnableTypePools = {
  allOptions: string[];
  attachmentOptions: string[];
  cargoOptions: string[];
  vehicleOptions: string[];
  weaponOptions: string[];
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function analyzeSpawnableTypes(
  items: SpawnableTypeItem[]
): SpawnableTypePools {
  const attachmentOptions = uniqueSorted(
    items.flatMap((item) => item.attachments.map((entry) => entry.name))
  );

  const cargoOptions = uniqueSorted(
    items.flatMap((item) => item.cargo.map((entry) => entry.name))
  );

  const allOptions = uniqueSorted([
    ...items.map((item) => item.name),
    ...attachmentOptions,
    ...cargoOptions,
  ]);

  const vehicleOptions = allOptions.filter((name) => {
    const lower = name.toLowerCase();

    return (
      lower.includes("truck") ||
      lower.includes("sedan") ||
      lower.includes("hatchback") ||
      lower.includes("offroadhatchback") ||
      lower.includes("civilian") ||
      lower.includes("ada") ||
      lower.includes("olga") ||
      lower.includes("sarka") ||
      lower.includes("gunter") ||
      lower.includes("humvee") ||
      lower.includes("wheel") ||
      lower.includes("battery") ||
      lower.includes("sparkplug") ||
      lower.includes("radiator")
    );
  });

  const weaponOptions = allOptions.filter((name) => {
    const lower = name.toLowerCase();

    return (
      lower.includes("m4") ||
      lower.includes("ak") ||
      lower.includes("fal") ||
      lower.includes("svd") ||
      lower.includes("vss") ||
      lower.includes("val") ||
      lower.includes("sks") ||
      lower.includes("mosin") ||
      lower.includes("winchester") ||
      lower.includes("mp5") ||
      lower.includes("ump") ||
      lower.includes("glock") ||
      lower.includes("fnx") ||
      lower.includes("deagle") ||
      lower.includes("mag_") ||
      lower.includes("optic") ||
      lower.includes("suppressor")
    );
  });

  return {
    allOptions,
    attachmentOptions,
    cargoOptions,
    vehicleOptions,
    weaponOptions,
  };
}