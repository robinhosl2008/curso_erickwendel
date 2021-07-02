function mockData() {
    return {
        count: 1,
        next: null,
        previous: null,
        results: [{
            name: 'R2-D2',
            height: '96',
            mass: '32',
            hair_color: 'n/a',
            skin_color: 'white, blue',
            eye_color: 'red',
            birth_year: '33BBY',
            gender: 'n/a',
            homeworld: 'https://swapi.dev/api/planets/8/',
            created: '2014-12-10T15:11:50.376000Z',
            edited: '2014-12-20T21:17:50.311000Z',
            url: 'https://swapi.dev/api/people/3/'
        }]
    }
}

module.exports = mockData;