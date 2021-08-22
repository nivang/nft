const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let contract

  before(async () => {
    contract = await Color.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
      assert.notEqual(address, 0x0)

    })

    it('has a name', async () => {

      const name = contract.name()
      assert.equal(name, 'Color')

    })

    it('has a symbol', async () => {

      const symbol = contract.symbol()
      assert.equal(symbol, 'COLOR')

    })

  })

  describe('minitng', async () => {

    it('creates a new token', async () => {

      const result = await contract.mint('#ECO58E')
      const totalSupply = await contract.totalSupply()

      // When Succesful

      assert.equal(totalSupply, 1)
      cost event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from')
      assert.equal(event.to, accounts[0], 'to is correct')

      // If Failed

      await contract.mint('#ECO58E').should.be.rejected;


    })

  })

  describe('indexing', async () => {

    it('lists colors', async () => {

      await contract.mint('#032cfc')
      await contract.mint('#fc9d03')
      await contract.mint('#fc0314')

      const totalSupply = await contract.totalSupply()

      let color 
      let result = []

      for (var i = i; i <= totalSupply; i++) {

        color = await contract.color(i - 1)
        result.push(color)

      }

      let expected = ['#ECO58E', '#032CFC', '#FC9D03', '#FC0314']

      assert.equal(result.join(','), expected.join(','))

    })

  })

})