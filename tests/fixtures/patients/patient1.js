var patient1 = {
  "resourceType": "Patient",
  "text": {
    "status": "generated",
    "div": "<div>\n      <p>Patient Donald DUCK @ Acme Healthcare, Inc. MR = 654321</p>\n    </div>"
  },
  "identifier": [
    {
      "use": "usual",
      "label": "MRN",
      "system": "urn:oid:0.1.2.3.4.5.6.7",
      "value": "654321"
    }
  ],
  "name": [
    {
      "use": "official",
      "family": [
        "Donald"
      ],
      "given": [
        "Duck"
      ]
    }
  ],
  "gender": "male",
  "photo": [
    {
      "contentType": "image/gif",
      "data": "R0lGODlhEwARAPcAAAAAAAAA/+9aAO+1AP/WAP/eAP/eCP/eEP/eGP/nAP/nCP/nEP/nIf/nKf/nUv/nWv/vAP/vCP/vEP/vGP/vIf/vKf/vMf/vOf/vWv/vY//va//vjP/3c//3lP/3nP//tf//vf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAATABEAAAi+AAMIDDCgYMGBCBMSvMCQ4QCFCQcwDBGCA4cLDyEGECDxAoAQHjxwyKhQAMeGIUOSJJjRpIAGDS5wCDly4AALFlYOgHlBwwOSNydM0AmzwYGjBi8IHWoTgQYORg8QIGDAwAKhESI8HIDgwQaRDI1WXXAhK9MBBzZ8/XDxQoUFZC9IiCBh6wEHGz6IbNuwQoSpWxEgyLCXL8O/gAnylNlW6AUEBRIL7Og3KwQIiCXb9HsZQoIEUzUjNEiaNMKAAAA7"
    }
  ],
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/patient-contact-relationship",
              "code": "owner"
            }
          ]
        }
      ],
      "organization": {
        "reference": "Organization/1",
        "display": "Walt Disney Corporation"
      }
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1",
    "display": "ACME Healthcare, Inc"
  },
  "link": [
    {
      "other": {
        "reference": "Patient/pat2"
      },
      "type": "seealso"
    }
  ],
  "active": true
};

export {patient1 as default} ;
