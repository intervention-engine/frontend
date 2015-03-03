`import ApplicationSerializer from './application'`
MedicationStatementSerializer = ApplicationSerializer.extend
    attrs:
        identifier : {embedded: 'always'}
        patient : {embedded: 'always'}
        reasonNotGiven : {embedded: 'always'}
        whenGiven : {embedded: 'always'}
        medication : {embedded: 'always'}
        device : {embedded: 'always'}
        dosage : {embedded: 'always'}

`export default MedicationStatementSerializer`
