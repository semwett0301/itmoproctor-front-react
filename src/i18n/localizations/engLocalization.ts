export interface ILocalization {
  translation: {
    unauthorized: object
    student: object
    proctor: object
    admin: object
    shared: object
  }
}

export const engLocalization: ILocalization = {
  translation: {
    unauthorized: {
      auth: {
        login: 'Login',
        password: 'Password',
        signIn: 'Sign in',
        or: 'or',
        openEdu: 'sign in using “OpenEdu”'
      },
      installing: {
        name: 'Proctoring system from ITMO',
        download: 'Download',
        version: 'version',
        from: 'from',
        other: 'Other versions of application',
        forEach: 'For',
        prevVersion: 'Previous version',
        nextVersion: 'Next version'
      }
    },
    student: {
      name: 'Username'
    },
    proctor: {},
    admin: {
      usersImport: {
        "title": "User import",
        "importButton": "Import",
        "closeButton": "Close",
        "filebox": "File",
        "fileboxButton": "Select",
        "fileboxPrompt": "CSV file (with header)",
        "exampleFile": "Example file",
        "exampleFileButton": "Download",
        "fields": {
          "lastname": "Lastname",
          "firstname": "Firstname",
          "middlename": "Middlename",
          "role": "Role (\"student\", \"proctor\", \"expert\")",
          "gender": "Gender (\"m\", \"f\")",
          "birthday": "Date of Birth (\"DD.MM.YYYY\")",
          "email": "Email",
          "citizenship": "Citizenship (a three-letter code)",
          "address": "Address",
          "documentType": "Document type",
          "documentNumber": "Document number",
          "documentIssueDate": "Date of issue (\"DD.MM.YYYY\")",
          "username": "Login",
          "password": "Password"
        },
        "successText": "Imported %{actual} of %{expected} users",
        "errorTitle": "Errors",
        "errors": {
          "unknown": "Unknown error",
          "requestTooLarge": "File is too large",
          "incorrectRowCount": "Incorrect row count: %{actual} instead of %{expected}",
          "incorrectColumnCount": "Row %{rowNumber}: Incorrect number of columns: %{actual} instead of %{expected}",
          "incorrectField": "Row %{rowNumber}: Field \"<i>%{field}</i>\" is incorrect: \"<i>%{value}</i>\". Reason: %{reason}"
        },
        "errorReasons": {
          "required": "Required field",
          "incorrectFormat": "Incorrect format"
        }
      }
    },
    shared: {
      settings: {
        errors: {
          webcam: {
            InvalidStateError: 'InvalidStateError: Failed to execute \'addStream\' on \'RTCPeerConnection\': The RTCPeerConnection\'s signalingState is \'closed\'.',
            NotAllowedError: 'NotAllowedError',
            NotAllowedErrorState: 'NotAllowedError: Invalid state',
            NotAllowedErrorPermission: 'NotAllowedError: Permission denied',
            NotAllowedErrorPermissionSystem: 'NotAllowedError: Permission denied by system',
            NotAllowedErrorRequest: 'NotAllowedError: The request is not allowed by the user agent or the platform in the current context.',
            NotFoundError: 'NotFoundError',
            NotFoundErrorDevice: 'NotFoundError: Requested device not found',
            NotFoundErrorObjectNotFound: 'NotFoundError: The object can not be found here.',
            NotReadableError: 'NotReadableError',
            NotReadableErrorStartVideo: 'NotReadableError: Could not start video source',
            NotReadableErrorAllocateVideo: 'NotReadableError: Failed to allocate videosource',
            OverconstrainedError: 'OverconstrainedError',
            TypeError: 'TypeError: Failed to execute \'getUserMedia\' on \'MediaDevices\': At least one of audio and video must be requested',
            Default: 'Default'
          },
          screen: {
            NotAllowedErrorPermission: 'NotAllowedError: Permission denied',
            NotAllowedErrorRequest: 'NotAllowedError: The request is not allowed by the user agent or the platform in the current context.'
          }
        }
      }
    }
  }
}
