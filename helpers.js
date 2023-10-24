export function getCookie(cname) {
  if (typeof window === "undefined") {
    return "";
  }

  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const sendDraft = async (draft) => {
  const raw = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
   <soapenv:Header/>
   <soapenv:Body>
      <web:createMassive>
         <web:name>${JSON.stringify(draft)}</web:name>
      </web:createMassive>
   </soapenv:Body>
</soapenv:Envelope>`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/soap+xml",
    },
    mode: "cors",
    body: raw,
  };

  await fetch("http://localhost:8000", requestOptions);
};

export const getDraftRecipes = async (userId) => {
  const raw = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8000/draft">
   <soapenv:Header/>
   <soapenv:Body>
      <web:createMassive>
         <web:name>${userId}</web:name>
      </web:createMassive>
   </soapenv:Body>
</soapenv:Envelope>`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/soap+xml",
    },
    mode: "cors",
    body: raw,
  };

  try {
    const response = await fetch("http://localhost:8000", requestOptions);
    const xml = await response.text();

    console.log({ xml, response });
  } catch (error) {
    console.log(error);
  }
};
