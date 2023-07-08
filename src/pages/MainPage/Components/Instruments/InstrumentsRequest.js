import React, { useState } from "react";
import axios from "axios";

const crmEndpoint = "https://api2.traffkillas.kz";
const messengerEndpoint = "https://api2.traffkillas.kz";
export async function sendCodeRequest(e) {
  await axios.post(`${crmEndpoint}/request_code`, e, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

// export async function getChannels(e) {
//     return (await axios.get<ChannelItem[]>(`${messengerEndpoint}/api/v1/projects/all`, {
//         params: {
//             channelType
//         }
//     })).data;
// }
