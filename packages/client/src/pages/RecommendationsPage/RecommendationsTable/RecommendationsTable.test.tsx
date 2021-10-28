/*
 * © 2021 Thoughtworks, Inc.
 */

import { fireEvent, render, within, screen } from '@testing-library/react'
import each from 'jest-each'
import moment from 'moment'
import { EstimationResult } from '@cloud-carbon-footprint/common'
import { ServiceResult } from 'Types'
import {
  generateEstimations,
  mockData,
  mockRecommendationData,
} from 'utils/data'
import RecommendationsTable from './RecommendationsTable'
import { useRemoteService } from 'utils/hooks'

jest.mock('utils/hooks/RemoteServiceHook')

const mockUseRemoteService = useRemoteService as jest.MockedFunction<
  typeof useRemoteService
>

const testProps = {
  emissionsData: mockData.flatMap(
    (estimationResult) => estimationResult.serviceEstimates,
  ),
  recommendations: [],
  handleRowClick: jest.fn(),
  useKilograms: false,
}

describe('Recommendations Table', () => {
  let data: EstimationResult[]
  beforeEach(() => {
    data = generateEstimations(moment.utc(), 12)
    const mockReturnValue: ServiceResult<EstimationResult> = {
      loading: false,
      data: data,
    }
    mockUseRemoteService.mockReturnValue(mockReturnValue)
  })

  afterEach(() => {
    mockUseRemoteService.mockClear()
  })

  it('renders a Material UI Table', () => {
    const { getByRole } = render(<RecommendationsTable {...testProps} />)
    expect(getByRole('grid')).toBeInTheDocument()
  })

  it('configures the table with appropriate headers', () => {
    const { getByRole } = render(<RecommendationsTable {...testProps} />)

    const table = within(getByRole('grid'))

    const expectedHeaders = [
      'Cloud Provider',
      'Account Name',
      'Region',
      'Recommendation Type',
      'Potential Cost Savings ($)',
      'Potential Carbon Savings (t)',
    ]

    expectedHeaders.forEach((header) => {
      expect(table.getByText(header)).toBeInTheDocument()
    })
  })

  it('displays the passed data as the rows for the table', () => {
    const { getAllByRole } = render(
      <RecommendationsTable
        {...testProps}
        recommendations={mockRecommendationData}
      />,
    )
    const dataRows = getAllByRole('row')
    dataRows.shift() // Removes first row since it only contains the table headers
    const expectedRowData = mockRecommendationData.map((recommendation) =>
      Object.values(recommendation),
    )

    const actualRowData = dataRows.map((row) =>
      within(row).getAllByRole('cell'),
    )

    // Subtracts 3 from the row data length to ignore unused properties
    expect(actualRowData[0].length).toBe(expectedRowData[0].length - 5)
    expect(actualRowData[1].length).toBe(expectedRowData[1].length - 5)
  })

  it('calls handle row click with the recommendations details when a row is clicked', () => {
    const handleRowClick = jest.fn()
    render(
      <RecommendationsTable
        {...testProps}
        recommendations={mockRecommendationData}
        handleRowClick={handleRowClick}
      />,
    )
    fireEvent.click(screen.getByText('test-a'))
    expect(handleRowClick).toHaveBeenCalledTimes(1)
  })

  it('shows undefined cell values as "-" within the table', () => {
    const mockUndefinedRecommendations = [
      {
        cloudProvider: undefined,
        accountId: undefined,
        accountName: undefined,
        region: undefined,
        recommendationType: undefined,
        recommendationDetail: 'Test recommendation detail 1',
        costSavings: null,
        co2eSavings: null,
        kilowattHourSavings: null,
      },
    ]
    const { getAllByRole } = render(
      <RecommendationsTable
        {...testProps}
        recommendations={mockUndefinedRecommendations}
      />,
    )

    const dataRows = getAllByRole('row')
    dataRows.shift() // Removes row with table headers

    const actualRowData = dataRows.map((row) =>
      within(row).getAllByRole('cell'),
    )

    actualRowData[0].forEach((cell) => expect(cell.innerHTML).toBe('-'))
  })

  const co2eSavingsToBeRounded = [
    [0.01, '0.01'],
    [0.001, '0.001'],
    [0.0005, '0.001'],
    [0.0001, '< 0.001'],
    [0.00001, '< 0.001'],
    [0.000001, '< 0.001'],
    [0.0000001, '< 0.001'],
  ]

  each(co2eSavingsToBeRounded).it(
    'rounds savings to nearest 0.001 - val %s',
    (savings, roundedSavings) => {
      const { getAllByRole } = render(
        <RecommendationsTable
          {...testProps}
          recommendations={[
            {
              cloudProvider: undefined,
              accountId: undefined,
              accountName: undefined,
              region: undefined,
              recommendationType: undefined,
              recommendationDetail: undefined,
              costSavings: null,
              co2eSavings: savings,
              kilowattHourSavings: null,
            },
          ]}
          useKilograms={false}
        />,
      )

      const dataRows = getAllByRole('row')
      dataRows.shift() // Removes row with table headers

      const actualRowData = dataRows.map((row) =>
        within(row).getAllByRole('cell'),
      )

      const firstRow = actualRowData[0]

      // get last cell for CO2 data
      expect(firstRow[firstRow.length - 1].textContent).toBe(roundedSavings)
    },
  )

  const co2eSavingsToBeRoundedInKilograms = [
    [0.01, '10'],
    [0.001, '1'],
    [0.0005, '0.5'],
    [0.0001, '0.1'],
    [0.00001, '0.01'],
    [0.000001, '0.001'],
    [0.0000001, '< 0.001'],
  ]

  each(co2eSavingsToBeRoundedInKilograms).it(
    'rounds savings in kg to nearest 0.001 - val %s',
    (savings, roundedSavingsInKilograms) => {
      const { getAllByRole } = render(
        <RecommendationsTable
          {...testProps}
          recommendations={[
            {
              cloudProvider: undefined,
              accountId: undefined,
              accountName: undefined,
              region: undefined,
              recommendationType: undefined,
              recommendationDetail: undefined,
              costSavings: null,
              co2eSavings: savings,
              kilowattHourSavings: null,
            },
          ]}
          useKilograms={true}
        />,
      )

      const dataRows = getAllByRole('row')
      dataRows.shift() // Removes row with table headers

      const actualRowData = dataRows.map((row) =>
        within(row).getAllByRole('cell'),
      )

      const firstRow = actualRowData[0]

      // get last cell for CO2 data
      expect(firstRow[firstRow.length - 1].textContent).toBe(
        roundedSavingsInKilograms,
      )
    },
  )

  it('toggles CO2 units between metric tons and kilograms', () => {
    const mockRecommendations = [
      {
        cloudProvider: undefined,
        accountId: undefined,
        accountName: undefined,
        region: undefined,
        recommendationType: undefined,
        recommendationDetail: 'Test recommendation detail 1',
        costSavings: undefined,
        co2eSavings: 2.56,
        kilowattHourSavings: undefined,
      },
    ]
    const { getAllByRole, getByRole } = render(
      <RecommendationsTable
        {...testProps}
        recommendations={mockRecommendations}
        useKilograms={true}
      />,
    )

    const dataRows = getAllByRole('row')
    dataRows.shift() // Removes row with table headers

    const actualRowData = dataRows.map((row) =>
      within(row).getAllByRole('cell'),
    )

    const firstRow = actualRowData[0]

    expect(firstRow[firstRow.length - 1].innerHTML).toBe('2560')

    const table = within(getByRole('grid'))

    expect(table.getByText('Potential Carbon Savings (kg)')).toBeTruthy()
  })

  it('should display message when table is empty', () => {
    const { getByRole } = render(
      <RecommendationsTable
        {...testProps}
        recommendations={mockRecommendationData}
      />,
    )
    const dataGrid = within(getByRole('grid'))
    const searchBar = getByRole('textbox')

    const emptyGridMessage =
      "There's no data to display! Expand your search parameters to get started. (Try adding accounts, regions or recommendation types)"
    expect(dataGrid.queryByText(emptyGridMessage)).not.toBeInTheDocument()

    fireEvent.change(searchBar, {
      target: { value: 'should filter everything out' },
    })
    expect(dataGrid.queryByText(emptyGridMessage)).toBeInTheDocument()
  })

  describe('Search Bar', () => {
    it('should render search bar', () => {
      const { getByTestId } = render(<RecommendationsTable {...testProps} />)

      expect(getByTestId('search-input')).toBeInTheDocument()
    })

    it('should update the search bar', () => {
      const { getByRole } = render(<RecommendationsTable {...testProps} />)

      const searchBar = getByRole('textbox')

      fireEvent.change(searchBar, { target: { value: 'account 1' } })

      expect(searchBar.value).toBe('account 1')
    })

    const searchedRecommendationsRows = [
      ['test-b', true, 1],
      ['AWS', true, 2],
      ['us-west-1', true, 1],
      ['Modify', true, 1],
      [2.539, true, 1],
      ['pizza', undefined, 0],
      [6.2, undefined, 0],
    ]

    each(searchedRecommendationsRows).it(
      'should filter according to search bar value %s',
      (searchValue, expectedResult, rowsLength) => {
        const { getByRole, getAllByRole, getByLabelText } = render(
          <RecommendationsTable
            {...testProps}
            recommendations={mockRecommendationData}
          />,
        )

        const searchBar = getByRole('textbox')

        fireEvent.change(searchBar, { target: { value: searchValue } })

        let dataRows = getAllByRole('row')
        dataRows.shift() // Removes row with table headers

        const actualRowData = dataRows.map((row) =>
          within(row).getAllByRole('cell'),
        )

        expect(
          actualRowData[0]?.some((cell) =>
            cell.innerHTML.includes(searchValue),
          ),
        ).toBe(expectedResult)

        expect(actualRowData.length).toEqual(rowsLength)

        const clearButton = getByLabelText('clear search')

        fireEvent.click(clearButton)

        expect(searchBar.value).toBe('')

        dataRows = getAllByRole('row')
        dataRows.shift() // Removes row with table headers

        expect(dataRows.length).toEqual(2)
      },
    )
  })

  describe('Forecast', () => {
    it('should render the forecast component', () => {
      const { getByText } = render(
        <RecommendationsTable
          {...testProps}
          recommendations={mockRecommendationData}
        />,
      )

      expect(getByText('Forecast')).toBeInTheDocument()
    })
  })

  describe('Pagination', () => {
    const mockRecommendationsFor2Pages = [...mockRecommendationData]

    // Build duplicate recommendations for multiple pages
    for (let i = 0; i < 27; i++) {
      mockRecommendationsFor2Pages.push({
        cloudProvider: 'AWS',
        accountId: 'account ' + i,
        accountName: 'account ' + i,
        region: 'us-west-2',
        recommendationType: 'Terminate',
        recommendationDetail: 'Test recommendation detail 2',
        costSavings: 100,
        co2eSavings: 1.24,
        kilowattHourSavings: 6.2,
        instanceName: 'test-instance',
        resourceId: 'test-resource-id',
      })
    }

    it('should reset to first page when table data is changed', () => {
      const { getAllByLabelText } = render(
        <RecommendationsTable
          {...testProps}
          recommendations={mockRecommendationsFor2Pages}
        />,
      )
      const activePageStyle = 'backgroundColor: #3f51b5'

      // Only check buttons in first pagination instance
      expect(getAllByLabelText('page 1')[0]).toHaveStyle(activePageStyle)

      const nextPageButton = getAllByLabelText('Go to page 2')[0]
      fireEvent.click(nextPageButton)

      expect(getAllByLabelText('page 2')[0]).toHaveStyle(activePageStyle)
      expect(getAllByLabelText('Go to page 1')[0]).not.toHaveStyle(
        activePageStyle,
      )

      // Get first sort button
      const sortButton = getAllByLabelText('Sort')[0]
      fireEvent.click(sortButton)

      expect(getAllByLabelText('Go to page 2')[0]).not.toHaveStyle(
        activePageStyle,
      )
      expect(getAllByLabelText('page 1')[0]).toHaveStyle(activePageStyle)
    })

    it('should reset to page 1 after search, filters, and sorting are applied', () => {
      const { getByRole, getAllByLabelText } = render(
        <RecommendationsTable
          {...testProps}
          recommendations={mockRecommendationsFor2Pages}
        />,
      )

      const activePageStyle = 'backgroundColor: #3f51b5'

      // Only check buttons in first pagination instance
      expect(getAllByLabelText('page 1')[0]).toHaveStyle(activePageStyle)

      const nextPageButton = getAllByLabelText('Go to page 2')[0]
      fireEvent.click(nextPageButton)

      expect(getAllByLabelText('page 2')[0]).toHaveStyle(activePageStyle)
      expect(getAllByLabelText('Go to page 1')[0]).not.toHaveStyle(
        activePageStyle,
      )

      //change value of the search bar
      const searchBar = getByRole('textbox')
      fireEvent.change(searchBar, { target: { value: 'aws' } })

      expect(getAllByLabelText('Go to page 2')[0]).not.toHaveStyle(
        activePageStyle,
      )
      expect(getAllByLabelText('page 1')[0]).toHaveStyle(activePageStyle)
    })
  })
})
