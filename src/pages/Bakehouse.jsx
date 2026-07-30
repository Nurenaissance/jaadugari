import VenuePage from './VenuePage'
import { getVenue } from '../data/venues'
import { useDocumentMeta } from '../lib/meta'

function Bakehouse() {
  useDocumentMeta(
    'Jaadugari Bakehouse — Bakery & Café | Morjim, Goa',
    'Jaadugari Bakehouse — our bakery and café at Vithaldas Waddo, Morjim, North Goa. Coffee, bread and pastry from the Jaadugari kitchen.'
  )

  return <VenuePage venue={getVenue('bakehouse')} />
}

export default Bakehouse
