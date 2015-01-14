`import ApplicationSerializer from './application'`

AttachmentSerializer = ApplicationSerializer.extend(
  attrs:
    data : {embedded: 'always'}
    hash : {embedded: 'always'}
)

`export default AttachmentSerializer`
