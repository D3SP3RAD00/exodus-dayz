export type SpawnableAttachment = {
  name: string;
  chance: string;
};

export type SpawnableTypeItem = {
  name: string;
  attachments: SpawnableAttachment[];
  cargo: SpawnableAttachment[];
};

export type LoadedSpawnableFile = {
  fileName: string;
  xmlText: string;
  rootNode: string;
  valid: boolean;
  error?: string;
};

export function parseSpawnableTypesXml(
  xmlText: string,
  fileName: string
): {
  loaded: LoadedSpawnableFile;
  items: SpawnableTypeItem[];
} {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  const error = xml.querySelector("parsererror");

  if (error) {
    return {
      loaded: {
        fileName,
        xmlText,
        rootNode: "Unknown",
        valid: false,
        error: "XML syntax error detected.",
      },
      items: [],
    };
  }

  const rootNode = xml.documentElement.nodeName;

  const items = Array.from(xml.getElementsByTagName("type")).map((type) => {
    const attachments = Array.from(type.getElementsByTagName("attachments"))
      .flatMap((group) =>
        Array.from(group.getElementsByTagName("item")).map((item) => ({
          name: item.getAttribute("name") || "",
          chance: item.getAttribute("chance") || "1.00",
        }))
      )
      .filter((item) => item.name);

    const cargo = Array.from(type.getElementsByTagName("cargo"))
      .flatMap((group) =>
        Array.from(group.getElementsByTagName("item")).map((item) => ({
          name: item.getAttribute("name") || "",
          chance: item.getAttribute("chance") || "1.00",
        }))
      )
      .filter((item) => item.name);

    return {
      name: type.getAttribute("name") || "UNKNOWN",
      attachments,
      cargo,
    };
  });

  return {
    loaded: {
      fileName,
      xmlText,
      rootNode,
      valid: true,
    },
    items,
  };
}