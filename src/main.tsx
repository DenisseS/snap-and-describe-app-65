import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';


throw new Error("SW Dropbox Sharing: operation failed 400 Error in call to API function \"sharing/add_folder_member\": request body: shared_folder_id: '/NutriInfo/lists/lista-compartid-1755571312744-225s' did not match pattern '[-_0-9a-zA-Z:]+'\n" +
  "(anonymous) @ dropbox.js:98\n" +
  "await in (anonymous)\n" +
  "processLoop @ queue.js:163\n" +
  "await in processLoop\n" +
  "start @ queue.js:206\n" +
  "enqueue @ queue.js:108\n" +
  "await in enqueue\n" +
  "(anonymous) @ sw.js:188" +
  "Check the consolelog for more details. Right now we have two problems: the message that the invitation was sent is  shown even if there is an error, to get the correct share folder id, can we store that id as part of the json of the file so we don't have to call metadata everytime we want to share the folder, as the response of the upload you have the id of the list, so just update local cache with that and we a new update. so when we want to share we always have the id of the file as part of the json " );

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);