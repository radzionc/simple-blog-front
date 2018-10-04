import { DateTime } from 'luxon'


export const timestampForHuman = timestamp => DateTime.fromMillis(timestamp * 1000).toLocaleString({ month: 'long', day: 'numeric' })