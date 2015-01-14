`import ApplicationSerializer from './application'`

HospitalizationSerializer = ApplicationSerializer.extend(
  attrs:
    preAdmissionIdentifier : {embedded: 'always'}
    origin : {embedded: 'always'}
    admitSource : {embedded: 'always'}
    period : {embedded: 'always'}
    accomodation : {embedded: 'always'}
    diet : {embedded: 'always'}
    specialCourtesy : {embedded: 'always'}
    specialArrangement : {embedded: 'always'}
    destination : {embedded: 'always'}
    dischargeDisposition : {embedded: 'always'}
    dischargeDiagnosis : {embedded: 'always'}
)

`export default HospitalizationSerializer`
