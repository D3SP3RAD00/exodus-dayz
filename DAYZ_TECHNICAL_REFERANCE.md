# DAYZ TECHNICAL REFERENCE

## Purpose

This document is the authoritative reference for every editor inside Exodus Studio.

The purpose is to ensure that editors understand DayZ mechanics instead of simply editing XML.

No editor should ever generate XML that could realistically break a server or create impossible combinations.

When uncertainty exists, follow official Bohemia documentation first.

---

# Official References

Bohemia Interactive Community Wiki

https://community.bistudio.com/wiki/DayZ:Central_Economy_Configuration

Mission File Modding

https://community.bistudio.com/wiki/DayZ:Central_Economy_mission_files_modding

Official Central Economy Repository

https://github.com/BohemiaInteractive/DayZ-Central-Economy

---

# Exodus Studio Design Philosophy

The user should never need to know XML.

Editors should understand gameplay.

The software generates the XML.

Every editor should prevent impossible combinations before export.

---

# Supported Economy Files

types.xml

spawnabletypes.xml

events.xml

cfgeventspawns.xml

globals.xml

economy.xml

cfgplayerspawnpoints.xml

mapgrouppos.xml

mapgroupproto.xml

territories.xml

messages.xml

---

# Editor Safety Rules

Editors must never intentionally generate:

invalid XML

duplicate nodes

missing required attributes

illegal classname references

unsupported attachment combinations

unsupported cargo combinations

invalid chance values

negative quantities

broken inheritance

references to missing items

---

# Validation Levels

Green

Safe

Yellow

Valid but unusual

Red

Likely to break gameplay

Critical

Do not allow export.

---

# Editor Philosophy

Every editor should:

Explain

Validate

Visualize

Generate

Never expose raw XML unless requested.

---

# Cross File Validation

Future goal:

types.xml

↓

spawnabletypes.xml

↓

events.xml

↓

cfgeventspawns.xml

↓

globals.xml

↓

economy.xml

Every editor should understand relationships between files.

---

# Goal

Exodus Studio should become the safest DayZ economy editor available.