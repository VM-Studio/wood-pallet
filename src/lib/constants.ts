export const EMPRESA = {
  nombre:      'Wood Pallet',
  slogan:      'Líderes en Pallets',
  descripcion: 'Fabricación y venta de pallets de madera, nuevos y usados, para uso local y para exportación.',
  telefono:    '11 3005-8664',
  whatsapp:    '+5491166231866',
  email:       'ventasmadererajj32@gmail.com',
  direccion:   'Benito Lynch & Don Orione, Los Troncos del Talar, Tigre, Buenos Aires',
  instagram:   'https://instagram.com/madererajj',
  facebook:    'https://www.facebook.com/profile.php?id=100068290073960',
  maps:        'https://www.google.com/maps/place/Benito+Lynch+%26+Don+Orione,+Los+Troncos+del+Talar,+Provincia+de+Buenos+Aires/@-34.4412257,-58.5950847,17z',
  anios:       '+10 años',
  fundacion:   'Empresa familiar',
}

export const WHATSAPP_LINKS = {
  general:    `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets.&type=phone_number&app_absent=0`,
  euro:       `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20Euros.&type=phone_number&app_absent=0`,
  estandar:   `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20Estandar.&type=phone_number&app_absent=0`,
  liviano:    `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20Estandar%20Liviano.&type=phone_number&app_absent=0`,
  usados:     `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20Usados.&type=phone_number&app_absent=0`,
  tirante:    `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20con%20Tirantes.&type=phone_number&app_absent=0`,
  dobleFaz:   `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20Doble%20Faz.&type=phone_number&app_absent=0`,
  especiales: `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20Especiales.&type=phone_number&app_absent=0`,
  carton:     `https://api.whatsapp.com/send/?phone=${EMPRESA.whatsapp.replace('+','')}&text=Buenas,%20estoy%20buscando%20una%20cotizacion%20de%20Pallets%20de%20Carton.&type=phone_number&app_absent=0`,
}

export const NAV_LINKS = [
  { label: 'Inicio',           href: '/'              },
  { label: 'Productos',        href: '/productos'     },
  { label: 'Pallet de Cartón', href: '/pallet-carton' },
  { label: 'Servicios',        href: '/servicios'     },
  { label: 'Contacto',         href: '/contacto'      },
]
