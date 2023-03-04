import i18n from 'i18next';

export default function (): void {
  const fields = 'lastname,firstname,middlename,role,gender,birthday,email,citizenship,address,documentType,documentNumber,documentIssueDate,username,password';
  const csv = fields.split(',').map((v) => {
    const text = i18n.t('admin.usersImport.fields.' + v);
    return '"' + text.replace(/"/g, '""') + '"';
  }).join(',') + '\r\n';

  const link = document.createElement('a');
  const blob = new Blob([csv], {type: 'text/csv'});

  let url: string | null = null;
  if (window.URL && window.URL.createObjectURL) {
    url = window.URL.createObjectURL(blob);
  }
  else if (window.webkitURL) {
    url = window.webkitURL.createObjectURL(blob);
  }

  link.style.display = 'none'
  // link.onclick = e => e.preventDefault()
  link.href = url ?? ''
  link.download = 'users_template.csv'

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link)
}
