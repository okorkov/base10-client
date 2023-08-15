import { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyModal from './components/FinancialModal';
import CreateNewCompanyModal from './components/CreateNewCompanyModal';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

function App() {
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [businessModels, setBusinessModels] = useState([]);
  const [isAddNewEntryModalOpen, setAddNewEntryIsModalOpen] = useState(false);
  const [viewCompanyDetailsModal, setViewCompanyDetailsModal] = useState({ open: false, item: {} });

  useEffect(() => {
    axios.get('http://localhost:3000/companies')
      .then((response) => {
        setCompanies(response.data)
      })
      .catch((error) => {
        alert(error);
      })
    axios.get('http://localhost:3000/get_industries')
      .then((response) => {
        setIndustries(response.data)
      })
      .catch((error) => {
        alert(error);
      })
    axios.get('http://localhost:3000/get_business_models')
      .then((response) => {
        setBusinessModels(response.data)
      })
      .catch((error) => {
        alert(error);
      })
  }, [])

  const handleCreateNewCompanyClick = () => {
    setAddNewEntryIsModalOpen(true);
  }

  return (
    <>
      <header className="flex justify-between p-4">
        <button onClick={handleCreateNewCompanyClick} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add New Company</button>
        <h1 className="font-bold text-3xl text-center pb-4">Base10 Company List</h1>
        <div className="w-28" />   {/* make it search bar later */}
      </header>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Industry(s)
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Business model(s)
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      HQ location
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Founder quality
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Feature set
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    companies.map((company) => {
                      return (
                        <tr className="bg-gray-100 border-b cursor-pointer" onClick={() => setViewCompanyDetailsModal({ open: true, item: company })}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex align-middle">
                            {
                              company.company_logo ?
                                <img className="w-6 h-6 rounded-full mr-2" src={company.company_logo} alt="Company logo" /> : null
                            }
                            {company.company_name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {
                              company?.industries.map(industry => {
                                return (
                                  <>
                                    <span>{industry.name}</span>
                                    <br />
                                  </>
                                )
                              })
                            }
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {
                              company?.business_models.map(industry => {
                                return (
                                  <>
                                    <span>{industry.name}</span>
                                    <br />
                                  </>
                                )
                              })
                            }
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {company.hq_city + ", " + company.hq_country}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {company.founder_quality}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {company.feature_set}
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {!companies.length ? <div className="flex justify-center">
                  <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />
                    <LinearProgress color="success" />
                    <LinearProgress color="inherit" />
                  </Stack>
                </div> : null}
            </div>
          </div>
        </div>
      </div>

      <CreateNewCompanyModal setCompanies={setCompanies} industries={industries} businessModels={businessModels} open={isAddNewEntryModalOpen} setOpen={setAddNewEntryIsModalOpen} />
      <CompanyModal viewCompanyDetailsModal={viewCompanyDetailsModal} setViewCompanyDetailsModal={setViewCompanyDetailsModal} />
    </>
  )
}

export default App
