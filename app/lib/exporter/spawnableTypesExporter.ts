import { SpawnableTypeItem } from "../parser/spawnableTypesParser";

export function exportSpawnableTypesXml(
  originalXml: string,
  items: SpawnableTypeItem[],
  fileName: string
) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(originalXml, "application/xml");

  for (const item of items) {
    const type = Array.from(xml.getElementsByTagName("type")).find(
      (node) => node.getAttribute("name") === item.name
    );

    if (!type) continue;

    const attachmentGroups = Array.from(type.getElementsByTagName("attachments"));
    for (const group of attachmentGroups) {
      while (group.firstChild) group.removeChild(group.firstChild);

      for (const attachment of item.attachments) {
        const node = xml.createElement("item");
        node.setAttribute("name", attachment.name);
        node.setAttribute("chance", attachment.chance || "1.00");
        group.appendChild(node);
      }
    }

    const cargoGroups = Array.from(type.getElementsByTagName("cargo"));
    for (const group of cargoGroups) {
      while (group.firstChild) group.removeChild(group.firstChild);

      for (const cargo of item.cargo) {
        const node = xml.createElement("item");
        node.setAttribute("name", cargo.name);
        node.setAttribute("chance", cargo.chance || "1.00");
        group.appendChild(node);
      }
    }
  }

  const output = new XMLSerializer().serializeToString(xml);
  const blob = new Blob([output], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.replace(".xml", "-edited.xml");
  link.click();

  URL.revokeObjectURL(url);
}