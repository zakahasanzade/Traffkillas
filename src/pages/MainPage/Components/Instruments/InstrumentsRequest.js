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

export async function getChannels(value) {
  try {
    const response = await axios.get(
      `${messengerEndpoint}/api/v1/projects/all`,
      {
        params: {
          channelType: value,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function submitCodeRequest(e) {
  const form = document.getElementById("InstrumentForm");
  const getChannelValue = document.querySelector("#Instruments_form_channel");
  const channelValues = getChannelValue.value.split(":;:;");
  const formData = new FormData(form);
  formData.append("name", channelValues[0]);
  formData.append("channelId", channelValues[1]);
  await axios.post(`${messengerEndpoint}/api/v1/projects/assign`, formData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
