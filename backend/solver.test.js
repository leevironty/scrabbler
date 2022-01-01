const solver = require('./solver')

describe('findEmpty', () => {
  test('Finds empty values worwards', () => {
    const row = [...'moi jest '].map(s => s.replace(' ', ''))
    expect(solver.findEmpty(row, 0, true)).toEqual(3)
    expect(solver.findEmpty(row, 2, true)).toEqual(3)
    expect(solver.findEmpty(row, 3, true)).toEqual(3)
    expect(solver.findEmpty(row, 4, true)).toEqual(8)
    expect(solver.findEmpty(row, 6, true)).toEqual(8)
    expect(solver.findEmpty(row, 8, true)).toEqual(8)
  })
  test('Finds empty values backwards', () => {
    const row = [...'moi jest '].map(s => s.replace(' ', ''))
    expect(solver.findEmpty(row, 3, false)).toEqual(3)
    expect(solver.findEmpty(row, 4, false)).toEqual(3)
    expect(solver.findEmpty(row, 6, false)).toEqual(3)
    expect(solver.findEmpty(row, 8, false)).toEqual(8)
  })
  test('Returns nothing if called with index out of bounds', () => {
    const row = [...'moi jest '].map(s => s.replace(' ', ''))
    expect(solver.findEmpty(row, -1, true)).toBe(undefined)
    expect(solver.findEmpty(row, 9, false)).toBe(undefined)
  })
  test('Returns nothing if no empty exists in that direction', () => {
    const row = [...'moi jest'].map(s => s.replace(' ', ''))
    expect(solver.findEmpty(row, 2, false)).toBe(undefined)
    expect(solver.findEmpty(row, 6, true)).toBe(undefined)
  })
})

describe('getInitialPointers', () => {
  const row = [...'moi jest ja muut'].map(s => s.replace(' ', ''))
  test('Finds two pointers', () => {
    let res = solver.getInitialPointers(row, 4).map(p => p.position)
    expect(res).toEqual([3, 8])
    res = solver.getInitialPointers(row, 5).map(p => p.position)
    expect(res).toEqual([3, 8])
    res = solver.getInitialPointers(row, 7).map(p => p.position)
    expect(res).toEqual([3, 8])
    res = solver.getInitialPointers(row, 9).map(p => p.position)
    expect(res).toEqual([8, 11])
    res = solver.getInitialPointers(row, 8).map(p => p.position)
    expect(res).toEqual([8, 8])
  })
  test('Pointers can be outside of row', () => {
    let res = solver.getInitialPointers(row, 2).map(p => p.position)
    expect(res).toEqual([-1, 3])
    res = solver.getInitialPointers(row, 0).map(p => p.position)
    expect(res).toEqual([-1, 3])
    res = solver.getInitialPointers(row, 12).map(p => p.position)
    expect(res).toEqual([11, row.length])
    res = solver.getInitialPointers(row, 15).map(p => p.position)
    expect(res).toEqual([11, row.length])
  })
})

describe('getRow', () => {
  const board = [
    [
      '', '', '', '',
      '', '', ''
    ],
    [
      '',  'k', 'i',
      's', 's', 'a',
      ''
    ],
    [
      '', 'o', '', 'i',
      '', '',  ''
    ],
    [
      '', 'i', '', 'i',
      '', '',  ''
    ],
    [
      '',  'r', 'u',
      'l', 'l', 'a',
      ''
    ],
    [
      '', 'a', '', 'i',
      '', '',  ''
    ],
    [
      '', 't', '', '',
      '', '',  ''
    ]
  ]
  test('Finds horizontal rows', () => {
    const expected0 = [...'       '].map(l => l.replace(' ', ''))
    const expected1 = [...' kissa '].map(l => l.replace(' ', ''))
    const expected3 = [...' i i   '].map(l => l.replace(' ', ''))
    const expected4 = [...' rulla '].map(l => l.replace(' ', ''))
    expect(solver.getRow(board, 0, true)).toEqual(expected0)
    expect(solver.getRow(board, 1, true)).toEqual(expected1)
    expect(solver.getRow(board, 3, true)).toEqual(expected3)
    expect(solver.getRow(board, 4, true)).toEqual(expected4)
  })
  test('Finds vertical rows', () => {
    const expected0 = [...'       '].map(l => l.replace(' ', ''))
    const expected1 = [...' koirat'].map(l => l.replace(' ', ''))
    const expected2 = [...' i  u  '].map(l => l.replace(' ', ''))
    const expected3 = [...' siili '].map(l => l.replace(' ', ''))
    expect(solver.getRow(board, 0, false)).toEqual(expected0)
    expect(solver.getRow(board, 1, false)).toEqual(expected1)
    expect(solver.getRow(board, 2, false)).toEqual(expected2)
    expect(solver.getRow(board, 3, false)).toEqual(expected3)
  })
})

describe('getRows', () => {
  const board = [
    [
      '', '', '', '',
      '', '', ''
    ],
    [
      '',  'k', 'i',
      's', 's', 'a',
      ''
    ],
    [
      '', 'o', '', 'i',
      '', '',  ''
    ],
    [
      '', 'i', '', 'i',
      '', '',  ''
    ],
    [
      '',  'r', 'u',
      'l', 'l', 'a',
      ''
    ],
    [
      '', 'a', '', 'i',
      '', '',  ''
    ],
    [
      '', 't', '', '',
      '', '',  ''
    ]
  ]
  test('works on left edge', () => {
    const res = solver.getRows(board, 0, false)
    expect(res.lower).toBe(null)
    expect(res.middle).toEqual([...'       '].map(l => l.replace(' ', '')))
    expect(res.upper).toEqual([...' koirat'].map(l => l.replace(' ', '')))
  })
})

describe('getValidLetters', () => {
  test('Works', () => {
    const row = [...'  ka a '].map(l => l.replace(' ', ''))
    const expected = [...'lnms']
    const res = solver.getValidLetters(row, 4)
    // console.log(res)
    expect(expected.reduce((l, r) => l && res.has(r), true)).toBe(true)
  })
})

describe('getRoots', () => {
  const board = [
    [
      '', '',  '', '',
      '', 'k', ''
    ],
    [
      '', 'k', 'i', 's',
      '', 'a', ''
    ],
    [
      'o', '',  '', '',
      '',  'l', ''
    ],
    [
      'i', '',  '', '',
      '',  'a', ''
    ],
    [
      'r', '',  'k', 'a',
      '',  'a', ''
    ],
    [
      'a', '',  '', '',
      '',  'j', ''
    ],
    [
      '', '',  '', '',
      '', 'a', ''
    ]
  ]
  test('Finds unpopulated roots', () => {
    const res = solver.getRoots(board, 4, false)
    // console.log(res)
    expect(res.roots).toEqual([...Array(7).keys()])
    expect(res.constraints[0]).toEqual(new Set())
    expect(res.constraints[1]).toEqual(new Set('s'))
    expect(res.constraints[4]).toEqual(new Set('lnms'))
  })
  test('Finds populated roots', () => {
    const res = solver.getRoots(board, 1, true)
    expect(res.roots).toEqual([0, 1, 5])
    expect(res.constraints[0]).toEqual(new Set('k'))
    expect(res.constraints[1]).toBe(undefined)
    expect(res.constraints[2]).toBe(undefined)
    expect(res.constraints[5]).toBe(undefined)
  })
})

describe('expandTree', () => {
  test('Finds simple solutions w/o constraints', () => {
    const row = [...'r ka a '].map(l => l.replace(' ', ''))
    const root = 2
    const hand = [...'nmlrt']
    const constraints = {}
    const res = solver.expandTree(row, root, hand, constraints)
    const expected = ['kana', 'kama', 'kala']
    expect(new Set(res)).toEqual(new Set(expected))
  })
  test('Finds simple solutions w/ constraints', () => {
    const row = [...'r ka a '].map(l => l.replace(' ', ''))
    const root = 2
    const hand = [...'nmlrt']
    const constraints = {
      4: new Set('n')
    }
    const res = solver.expandTree(row, root, hand, constraints)
    const expected = ['kana']
    expect(new Set(res)).toEqual(new Set(expected))
  })
  test('Finds more complex solutions', () => {
    const row = [...'     a     '].map(l => l.replace(' ', ''))
    const root = 2
    const hand = [...'kanertoi']
    const constraints = {}
    const res = solver.expandTree(row, root, hand, constraints)
    const expected = ['kana', 'koira']
    expect(new Set(res)).toEqual(new Set(expected))
  })
})

describe('solveRow', () => {
  const board = [
    [
      '', '', '', '',
      '', '', ''
    ],
    [
      '', '', '',  '',
      '', '', 'k'
    ],
    [
      '',  'a', '', 'a',
      'a', '',  ''
    ],
    [
      '', '', '',  '',
      '', '', 's'
    ],
    [
      '', '', '',  '',
      '', '', 's'
    ],
    [
      '', '', '',  '',
      '', '', 'a'
    ],
    [
      '', '', '', '',
      '', '', ''
    ]
  ]
  const hand =  [
    'h', 'j', 'k',
    'n', 'o', 's',
    'i'
  ]
  test('Finds solutions', () => {
    const res = solver.solveRow(board, 6, false, hand)
    const expected = ['kissa']
    expect(res).toEqual(expected)
  })
})

describe('solve', () => {
  const board = [
    [
      '', '', '', '',
      '', '', ''
    ],
    [
      '', '', '',  '',
      '', '', 'k'
    ],
    [
      '',  'a', '', 'a',
      'a', '',  ''
    ],
    [
      '', '', '',  '',
      '', '', 's'
    ],
    [
      '', '', '',  '',
      '', '', 's'
    ],
    [
      '', '', '',  '',
      '', '', 'a'
    ],
    [
      '', '', '', '',
      '', '', ''
    ]
  ]
  const hand =  [
    'h', 'j', 'k',
    'n', 'o', 's',
    'i'
  ]
  test('Finds solutions', () => {
    const res = solver.solve(board, hand)
    const expected = ['kissa']
    expect(res).toEqual(expected)
  })
})