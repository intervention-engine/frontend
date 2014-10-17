
describe 'Testing Application Loads', ->
  describe 'The title should appear', ->
    it 'should say Intervention Engine', ->
      visit '/'
      find('h2').text().should.include("Intervention Engine")
