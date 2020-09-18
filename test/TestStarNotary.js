// grab a JSON representation of the contract
const StarNotary = artifacts.require('StarNotary');

let accounts;
let owner;

// calls and initializes the contract
// receiving its accounts as parameter
contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

// was starName property initialized correctly?
it('has correct name', async () => {
    let instance = await StarNotary.deployed(); // grab instance of contract, if deployed
    let starName = await instance.starName.call(); // .call() tells ethereum we don't want to persist any changes
    assert.equal(starName, 'Awesome Udacity Star'); // check if starName was initialized correctly
});

// can a star be claimed?
it('can be claimed', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
});

// can star ownership change?
it('can change ownership', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    let secondUser = accounts[1];
    await instance.claimStar({from: secondUser});
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner, secondUser);
});

// can star name change?
it('can change name', async () => {
    let instance = await StarNotary.deployed();
    let newName = 'testName';
    await instance.changeName(newName);
    let name = await instance.starName.call();
    assert.equal(newName, name);
})