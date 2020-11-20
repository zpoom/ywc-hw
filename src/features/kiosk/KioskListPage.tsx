import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Breadcrumb, Input, Radio, Select } from 'antd'
import data from '../../utils/data.json'
import { Card } from 'components/Card'
import { jsonAxios } from 'utils/axios'
import { SearchOutlined } from '@ant-design/icons'
import { insertAssetPrefix } from 'utils/const'

const { Option } = Select

const BreadcrumbWrapper = styled.div`
  background-color: rgb(39, 57, 124);
  color: white;
  /* padding: 0.75rem; */
`

const SearchOptionWrapper = styled.div`
  min-width: 22rem !important;
`

const PageContainer = styled.div`
  background: url('result-bg.png');
  min-height: 100vh;
  background-size: cover;
  width: 100vw;
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  background-position: center center;
`

export const KioskListPage = () => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [priceRanges, setPriceRanges] = useState([])
  const [merchants, setMerchants] = useState([])
  const [dataSource, setDataSource] = useState({
    categories: [],
    subcategories: [],
    provinces: [],
    priceRange: [],
    merchants: [],
  })
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState(-1)
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  const fetchJsonData = async () => {
    const resp = (await jsonAxios.get('')).data
    setDataSource(resp)
    setCategories(resp.categories)
    const subCats =
      resp.categories.find((cat) => cat.name === selectedCategory)
        ?.subcategories || []
    setSubCategories(subCats)
    setProvinces(resp.provinces)
    setPriceRanges(resp.priceRange)
    setMerchants(resp.merchants)
  }
  const handleSelectCategory = (value) => {
    setSelectedSubCategory('')
    const cat = value
    setSelectedCategory(cat)

    if (cat === '') {
      setSubCategories([])
    }

    const subCats =
      dataSource.categories.find((category) => category.name === cat)
        ?.subcategories || []
    setSubCategories(subCats)
  }

  const handleChangeCategory = (event) => {
    setSelectedSubCategory('')
    const cat = event?.target?.value
    setSelectedCategory(cat)

    if (cat === '') {
      setSubCategories([])
    }

    const subCats =
      dataSource.categories.find((category) => category.name === cat)
        ?.subcategories || []
    setSubCategories(subCats)
  }

  const handleSelectProvince = (value) => {
    const province = value
    setSelectedProvince(province)
  }

  const handleChangeSubCategory = (event) => {
    const subCat = event.target.value
    setSelectedSubCategory(subCat)
  }

  const handleSelectPriceRange = (value) => {
    const priceRange = value
    setSelectedPriceRange(priceRange)
  }
  useEffect(() => {
    setMerchants(
      dataSource.merchants.filter(
        (d) =>
          (selectedCategory === '' ||
            selectedCategory.includes(d.categoryName)) &&
          (selectedProvince === '' ||
            selectedProvince.includes(d.addressProvinceName)) &&
          (selectedPriceRange === -1 || selectedPriceRange === d.priceLevel),
      ),
    )
  }, [selectedCategory, selectedProvince, selectedPriceRange])

  useEffect(() => {
    fetchJsonData()
  }, [])

  return (
    <PageContainer>
      <div className="bg-white">
        <div
          className="flex justify-between items-center"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <div className="px-4 md:px-8 px-4 md:px-8 py-2">
            <img
              src={insertAssetPrefix('/halfhalf-logo.png')}
              style={{ width: '80%' }}
            />
          </div>
          <div
            className="flex h-full ml-auto h-auto above-the-fold-input items-center rounded-lg overflow-hidden mr-4 md:mr-8"
            style={{ flex: '1 1 0%', boxShadow: 'black 0px 0px 1px' }}
          >
            <div className="w-full sm:w-48 h-10 md:mt-0 hidden md:block">
              <Select
                className="w-full sm:w-48 h-10 h-10 md:h-10 text-sm"
                onChange={handleSelectProvince}
              >
                <Option value="พื้นที่ใกล้ฉัน">พื้นที่ใกล้ฉัน</Option>
                <Option value="">สถานที่ทั้งหมด</Option>
                {provinces.map((province) => (
                  <Option value={province} key={province}>
                    {province}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="w-full sm:w-84 flex-1 h-10 md:border-l">
              <Select
                className="w-full md:mt-0 h-full text-sm md:text-sm"
                suffixIcon={<SearchOutlined />}
                // showSearch
                style={{
                  border: '0px',
                  paddingRight: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  overflow: 'hidden',
                  verticalAlign: 'middle',
                  borderRadius: '0px',
                }}
                // optionFilterProp="children"
                onChange={handleSelectCategory}
              >
                {categories.map((c) => (
                  <Option value={c.name} key={`select_cat_${c.name}`}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <BreadcrumbWrapper>
        <div
          className="flex justify-start px-4 md:px-8 py-3 z-10 overflow-x-auto"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <div className="text-white whitespace-no-wrap underline false">
            หน้าแรก
          </div>
          <div className="text-gray-300 mx-3">/</div>
          <div className="text-white whitespace-no-wrap null pr-8">
            <div className="font-semibold"> ค้นหา</div>
          </div>
        </div>
      </BreadcrumbWrapper>
      <div className="px-4 py-4 md:px-4 md:py-4">
        <div className="mt-8 first:mt-0 break-word text-xl font-sans font-semibold mb-4 ">
          {`ผลการค้นหา ${selectedCategory} ทั้งหมด`}
        </div>
        <div className="flex items-start">
          <SearchOptionWrapper className="md:mr-8 md:block border rounded-sm border-gray-600 hidden relative md:relative">
            <div className="bg-white p-4 w-full">
              <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
                ประเภทร้านค้า
              </div>
              <Radio.Group
                className="mt-2"
                onChange={handleChangeCategory}
                value={selectedCategory}
              >
                <Radio style={{ display: 'block', height: '32px' }} value="">
                  ทั้งหมด
                </Radio>
                {categories.map((c) => (
                  <Radio
                    key={`cat${c.name}`}
                    style={{ display: 'block', height: '32px' }}
                    value={c.name}
                  >
                    {c.name}
                  </Radio>
                ))}
              </Radio.Group>
              <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
                จังหวัด/ใกล้ฉัน
              </div>
              <Select className="w-full" onChange={handleSelectProvince}>
                <Option value="พื้นที่ใกล้ฉัน">พื้นที่ใกล้ฉัน</Option>
                <Option value="">สถานที่ทั้งหมด</Option>
                {provinces.map((province) => (
                  <Option value={province} key={province}>
                    {province}
                  </Option>
                ))}
              </Select>
              <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
                ราคา
              </div>
              <Select className="w-full" onChange={handleSelectPriceRange}>
                <Option value={-1}>ทั้งหมด</Option>
                {priceRanges.map((priceRange, idx) => (
                  <Option value={idx + 1} key={priceRange}>
                    {priceRange}
                  </Option>
                ))}
              </Select>
              <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
                ประเภทอาหารและเครื่องดื่ม
              </div>
              <Radio.Group
                className="mt-2"
                onChange={handleChangeSubCategory}
                value={selectedSubCategory}
              >
                {subCategories.length > 0 && (
                  <>
                    <Radio
                      style={{ display: 'block', height: '32px' }}
                      value=""
                    >
                      ทั้งหมด
                    </Radio>
                    {subCategories.map((subCat: string, idx: number) => (
                      <Radio
                        key={idx}
                        style={{ display: 'block', height: '32px' }}
                        value={subCat}
                      >
                        {subCat}
                      </Radio>
                    ))}
                  </>
                )}
              </Radio.Group>
            </div>
          </SearchOptionWrapper>
          <div className="w-full">
            <div className="grid grid-cols-1 gap-2">
              {merchants.map((merchant, idx) => (
                <Card
                  shopName={merchant.shopNameTH}
                  key={idx}
                  thumbnail={merchant.coverImageId}
                  categoryName={merchant.categoryName}
                  addressDistrictName={merchant.addressDistrictName}
                  addressProvinceName={merchant.addressProvinceName}
                  isOpen={merchant.isOpen}
                  facilities={merchant.facilities}
                  priceLevel={merchant.priceLevel}
                  highlightText={merchant.highlightText}
                  recommendedItems={merchant.recommendedItems}
                ></Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
