---
title: Node.JS SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance Node.JS SDK (@amplitude/node) to the new SDK (@amplitude/analytics-node).
---

## Comparison 

--8<-- "includes/sdk-migration/sdk-migration-note.md"

| <div class="big-column">Feature</div> | [Latest Node SDK](./) | [Maintenance Node SDK](../../node/) |
| --- | --- | --- |
| Package | [@amplitude/analytics-node](https://www.npmjs.com/package/@amplitude/analytics-node) | [@amplitude/node](https://www.npmjs.com/package/@amplitude/node)|
| Configuration | Configuration is implemented by Configuration object during initialize amplitude. [More configurations](./#configuration). | Support explicity setter methods. [More configurations](../../node/#configuration).|
| Logger Provider | Amplitude Logger. Fully customizable. | Amplitude Logger.  Not customizable. |
| Storage Provider | LocalStorage by default. Fully customizable. | Local Storage. |
| Customization | Plugins | Middleware |
| Retry | Regular retry. | Regular retry by default. Also provide offline retry. You are able to customize your retry logic. Fully customizible. |
| Server Endpoint | HTTP V2 API |  HTTP V2 API |
| Batch API | Supported, with configuration. | Not supported. |