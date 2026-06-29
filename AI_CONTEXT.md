# EXODUS STUDIO

Version
0.1

Author
Jaime Rodriguez

Primary AI Architect
ChatGPT (Nova)

---

# Mission

Exodus Studio is being built to become the most advanced DayZ server management platform available.

The application should allow server owners to build, edit, analyze, optimize, validate, simulate and manage every aspect of a DayZ server without manually editing XML.

The project should always prioritize:

• Ease of use
• Professional UI
• Scalability
• Maintainability
• Performance

The application should feel like a commercial SaaS product.

---

# Design Philosophy

The UI should feel modern.

Inspired by:

Visual Studio Code

GitHub

Vercel

Linear

Raycast

Notion

The application should use:

Dark theme

Rounded corners

Soft shadows

Glass effects

Professional spacing

Smooth animations

Military-inspired color palette

Emerald accent colors

Avoid clutter.

Everything should have breathing room.

---

# Application Architecture

Every page should reuse shared components.

Never duplicate code.

Reusable UI belongs inside:

components/

Business logic belongs inside:

lib/

Pages should only assemble components.

Never place complex parsing or XML logic directly inside page.tsx.

---

# Current Features

types.xml Editor

XML Validation

XML Upload

Drag and Drop

Paste XML

Search

Statistics

Item Editing

Download Edited XML

Smart Warnings

Property Notes

Nova Notes

---

# Planned Features

Dashboard

Mission Control

Events Editor

Spawnable Types Editor

Globals Editor

Economy Editor

Messages Editor

MapGroupProto Editor

CfgEventSpawns Editor

Player Spawn Editor

POI Generator

Loot Simulator

Server Doctor

Nova AI Assistant

Community Templates

Server Profiles

Cloud Save

Version History

Premium Features

Team Collaboration

---

# Folder Structure

components/

layout/

upload/

editor/

stats/

warnings/

dashboard/

shared/

ai/

lib/

parser/

validator/

analyzer/

exporter/

presets/

utils/

hooks/

types/

data/

---

# Coding Rules

Never duplicate code.

Always use TypeScript.

Prefer reusable components.

Keep components small.

Business logic belongs inside lib/.

Run build before finishing.

Fix TypeScript errors.

Keep imports organized.

Use descriptive names.

Do not leave TODO comments.

Never break existing functionality.

---

# UI Rules

Every editor should look consistent.

Use the same:

Cards

Buttons

Spacing

Typography

Stat cards

Upload areas

Search boxes

Panels

Analysis cards

Navigation

Everything should look like one application.

---

# Nova AI

Nova is the built-in AI assistant.

Nova should provide:

Warnings

Suggestions

Balance recommendations

Economy analysis

Performance advice

XML explanations

Spawn explanations

Vanilla comparisons

Nova should feel helpful without being intrusive.

Nova should explain why a recommendation exists.

---

# DayZ Knowledge

The application understands:

types.xml

events.xml

spawnabletypes.xml

globals.xml

economy.xml

messages.xml

cfgeventspawns.xml

mapgroupproto.xml

cfgplayerspawnpoints.xml

territories

loot economy

dynamic events

Central Economy

tiers

categories

usage

flags

restock

nominal

minimum

lifetime

---

# Future Vision

Eventually users should:

Create an account

Choose a map

Load official vanilla files

Modify them visually

Save server profiles

Restore previous versions

Share builds

Compare against vanilla

Use AI optimization

Deploy directly to their server

No XML knowledge should be required.

---

# Product Philosophy

This is not an XML editor.

This is a complete DayZ development platform.

Every feature should answer:

Does this reduce manual work?

Does this improve understanding?

Does this make server ownership easier?

If the answer is yes, it belongs in Exodus Studio.

---

# Long-Term Goal

Become the standard application used by DayZ server owners.

Everything should be designed with long-term scalability in mind.

When making architectural decisions, always prefer reusable systems over quick fixes.

Quality is more important than speed.
