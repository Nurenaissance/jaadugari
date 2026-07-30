import VenuePage from './VenuePage'
import { getVenue } from '../data/venues'
import { useDocumentMeta } from '../lib/meta'

function Palampur() {
  useDocumentMeta(
    'Jaadugari Palampur — Restaurant | Lamrin Norwood Green, Himachal Pradesh',
    'Jaadugari Palampur — at Lamrin Norwood Green, Village Lohna, Palampur. Indian dining in the tea gardens of the Kangra valley, under the Dhauladhar range.'
  )

  return <VenuePage venue={getVenue('palampur')} />
}

export default Palampur
