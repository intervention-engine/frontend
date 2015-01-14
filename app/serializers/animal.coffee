`import ApplicationSerializer from './application'`

AnimalSerializer = ApplicationSerializer.extend(
  attrs:
    species : {embedded: 'always'}
    breed : {embedded: 'always'}
    genderStatus : {embedded: 'always'}
)

`export default AnimalSerializer`
