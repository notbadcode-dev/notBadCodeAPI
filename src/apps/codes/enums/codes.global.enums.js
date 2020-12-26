export const CreationCodeMode = Object.freeze({
    indeterminate: 0,
    manual: 1,
    scan: 2,
});

export const CodeFormats = Object.freeze({
    fake: 'Fake',
    manual: 'Manual',
    qrCode: 'QR_CODE',
    dataMatrix: 'DATA_MATRIX',
    upcE: 'UPC_E',
    upcA: 'UPC_A',
    ean8: 'EAN_8',
    ean13: 'EAN_13',
    code128: 'CODE_128',
    code39: 'CODE_39',
    code93: 'CODE_93',
    codabar: 'CODABAR',
    itf: 'ITF',
    rss14: 'RSS14',
    rssExpanded: 'RSS_EXPANDED',
    pdf417: 'PDF_417',
    aztec: 'AZTEC',
    msi: 'MSI',
});

export const CodeCategories = Object.freeze({
    other: 0,
    restaurant: 1,
    wifi: 2,
    officialOrganization: 3,
    web: 4,
    contact: 5,
    event: 6,
    medicine: 7,
});