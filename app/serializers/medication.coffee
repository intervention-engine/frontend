`import ApplicationSerializer from './application'`

MedicationSerializer = ApplicationSerializer.extend
    attrs:
        code : {embedded: 'always'}
        manufacturer : {embedded: 'always'}
        # product : {embedded: 'always'}
        # package : {embedded: 'always'}

`export default MedicationSerializer`
