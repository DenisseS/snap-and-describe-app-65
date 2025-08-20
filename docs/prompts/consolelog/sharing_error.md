chunk-IFOVNKIL.js?v=361347e5:338 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
(anonymous) @ chunk-IFOVNKIL.js?v=361347e5:338
commitHookEffectListMount @ chunk-QT63QQJV.js?v=361347e5:16915
commitPassiveMountOnFiber @ chunk-QT63QQJV.js?v=361347e5:18156
commitPassiveMountEffects_complete @ chunk-QT63QQJV.js?v=361347e5:18129
commitPassiveMountEffects_begin @ chunk-QT63QQJV.js?v=361347e5:18119
commitPassiveMountEffects @ chunk-QT63QQJV.js?v=361347e5:18109
flushPassiveEffectsImpl @ chunk-QT63QQJV.js?v=361347e5:19490
flushPassiveEffects @ chunk-QT63QQJV.js?v=361347e5:19447
commitRootImpl @ chunk-QT63QQJV.js?v=361347e5:19416
commitRoot @ chunk-QT63QQJV.js?v=361347e5:19277
performSyncWorkOnRoot @ chunk-QT63QQJV.js?v=361347e5:18895
flushSyncCallbacks @ chunk-QT63QQJV.js?v=361347e5:9119
(anonymous) @ chunk-QT63QQJV.js?v=361347e5:18627
chunk-IFOVNKIL.js?v=361347e5:338 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
(anonymous) @ chunk-IFOVNKIL.js?v=361347e5:338
commitHookEffectListMount @ chunk-QT63QQJV.js?v=361347e5:16915
invokePassiveEffectMountInDEV @ chunk-QT63QQJV.js?v=361347e5:18324
invokeEffectsInDev @ chunk-QT63QQJV.js?v=361347e5:19701
commitDoubleInvokeEffectsInDEV @ chunk-QT63QQJV.js?v=361347e5:19686
flushPassiveEffectsImpl @ chunk-QT63QQJV.js?v=361347e5:19503
flushPassiveEffects @ chunk-QT63QQJV.js?v=361347e5:19447
commitRootImpl @ chunk-QT63QQJV.js?v=361347e5:19416
commitRoot @ chunk-QT63QQJV.js?v=361347e5:19277
performSyncWorkOnRoot @ chunk-QT63QQJV.js?v=361347e5:18895
flushSyncCallbacks @ chunk-QT63QQJV.js?v=361347e5:9119
(anonymous) @ chunk-QT63QQJV.js?v=361347e5:18627
sw.js:102 Service Worker: Network success for asset: /inline/injected/styles/inline-tooltip.css
sw.js:106 Uncaught (in promise) TypeError: Failed to execute 'put' on 'Cache': Request scheme 'chrome-extension' is unsupported
at sw.js:106:36
(anonymous) @ sw.js:106
Promise.then
(anonymous) @ sw.js:106
Promise.then
(anonymous) @ sw.js:100
ShareListModal.tsx:66 🔗 ShareListModal: Inviting user: test@test.com to folder: /NutriInfo/lists/lista-compartid-1755571312744-225s
QueueClient.ts:35 QueueClient: enqueue {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s', hasPayload: true}
QueueClient.ts:35 QueueClient: enqueue {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s', hasPayload: true}
sw.js:187 SW: QUEUE_ENQUEUE {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s', hasPayload: true}
queue.js:99 SW Queue: enqueue {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s', lastUpdatedAt: 1755573632022}
sw.js:187 SW: QUEUE_ENQUEUE {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s', hasPayload: true}
queue.js:99 SW Queue: enqueue {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s', lastUpdatedAt: 1755573632023}
queue.js:107 SW Queue: auto-starting loop after enqueue (token present)
queue.js:205 SW Queue: start called, processing= false
queue.js:154 SW Queue: processing item {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s'}
dropbox.js:86 SW Dropbox Sharing: invite {folderPath: '/NutriInfo/lists/lista-compartid-1755571312744-225s', email: 'test@test.com'}
useQueueResource.ts:29 useQueueResource: event {type: 'QUEUE_EVENT', event: 'processing-start'}
sw.js:195 SW: QUEUE_STATUS {resourceKey: 'lista-compartid-1755571312744-225s'}
queue.js:118 SW Queue: status requested {processing: true, items: Array(1)}items: Array(1)0: coalesceUntil: 1755573632023id: "dropbox-sharing::lista-compartid-1755571312744-225s"lastUpdatedAt: 1755573632023queueName: "dropbox-sharing"resourceKey: "lista-compartid-1755571312744-225s"status: "processing"[[Prototype]]: Objectlength: 1[[Prototype]]: Array(0)processing: true[[Prototype]]: Object
dropbox.js:98 SW Dropbox Sharing: operation failed 400 Error in call to API function "sharing/add_folder_member": request body: shared_folder_id: '/NutriInfo/lists/lista-compartid-1755571312744-225s' did not match pattern '[-_0-9a-zA-Z:]+'
(anonymous) @ dropbox.js:98
await in (anonymous)
processLoop @ queue.js:163
await in processLoop
start @ queue.js:206
enqueue @ queue.js:108
await in enqueue
(anonymous) @ sw.js:188
queue.js:173 SW Queue: item failed {queueName: 'dropbox-sharing', resourceKey: 'lista-compartid-1755571312744-225s'}
processLoop @ queue.js:173
await in processLoop
start @ queue.js:206
enqueue @ queue.js:108
await in enqueue
(anonymous) @ sw.js:188
queue.js:192 SW Queue: loop finished {drained: true}
useQueueResource.ts:29 useQueueResource: event {type: 'QUEUE_EVENT', event: 'drained'}
