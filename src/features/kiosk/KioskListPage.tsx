import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import {
  Input,
  Radio,
  Select,
  Drawer,
  AutoComplete,
  InputNumber,
  Button,
} from 'antd'
import data from '../../utils/data.json'
import { Card } from 'components/Card'
import { jsonAxios } from 'utils/axios'
import { SearchOutlined, LeftOutlined } from '@ant-design/icons'
import { insertAssetPrefix } from 'utils/const'
import Fuse from 'fuse.js'

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
  padding-bottom: 4rem;
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
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)

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

  const handleSearch = (value) => {
    if (value !== '') {
      setSelectedCategory('')
      setSelectedSubCategory('')
      setSelectedProvince('')
      setSelectedPriceRange(-1)
      setSearchKeyword(value)
      const fuse = new Fuse(dataSource.merchants, {
        keys: ['shopNameTH'],
        threshold: 0.5,
      })
      setMerchants(fuse.search(value).map((res) => res.item))
      // fuse.search(value).map((res) => {})
    }
  }
  useEffect(() => {
    setMerchants(
      dataSource.merchants.filter(
        (d) =>
          (selectedCategory === '' ||
            selectedCategory.includes(d.categoryName)) &&
          (selectedProvince === '' ||
            selectedProvince.includes(d.addressProvinceName)) &&
          (selectedPriceRange === -1 || selectedPriceRange === d.priceLevel) &&
          (selectedSubCategory === '' ||
            selectedSubCategory === d.subcategoryName),
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
              className="hidden md:block"
            />
            <img
              src={insertAssetPrefix('/halfhalf-logo-mini.png')}
              style={{ width: '80%' }}
              className="block md:hidden"
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
                bordered={false}
                size="large"
                value={selectedProvince}
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
              <div className="w-full flex items-center h-full space-between">
                <AutoComplete
                  placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
                  size="large"
                  options={categories.map((cat) => ({ value: cat.name }))}
                  style={{ width: '100%' }}
                  bordered={false}
                  onSelect={handleSelectCategory}
                  onSearch={handleSearch}
                  // value={selectedCategory}
                >
                  <Input
                    size="large"
                    suffix={
                      <div className="flex h-full items-center px-6">
                        <SearchOutlined />
                      </div>
                    }
                    bordered={false}
                  ></Input>
                </AutoComplete>
                {/* <div
                  className="flex h-full items-center px-6 relative"
                  style={{ backgroundColor: '#f8f8f8', right: '0' }}
                >
                  <SearchOutlined />{' '}
                </div> */}
              </div>
            </div>
          </div>
          <img
            src={insertAssetPrefix('filter.png')}
            className="md:hidden mr-4 cursor-pointer"
            onClick={() => setOpenDrawer(true)}
          />
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
            <div className="font-semibold">ค้นหา</div>
          </div>
        </div>
      </BreadcrumbWrapper>
      <div className="px-4 py-4 md:px-4 md:py-4">
        <div className="mt-8 first:mt-0 break-word text-xl font-sans font-semibold mb-4 ">
          {`ผลการค้นหา ${selectedCategory} ${
            selectedPriceRange === -1
              ? ''
              : `, ราคา ${priceRanges[selectedPriceRange - 1]}`
          } ทั้งหมด`}
        </div>
        <div className="flex items-start">
          <SearchOptionWrapper className="md:mr-8 md:block border rounded-sm border-gray-600 hidden relative md:relative">
            <div className="bg-white p-4 w-full">
              <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
                ประเภทร้านค้า
              </div>
              <Radio.Group
                className="mt-4"
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
              <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
                จังหวัด/ใกล้ฉัน
              </div>
              <Select
                className="mt-2 w-full"
                onChange={handleSelectProvince}
                value={selectedProvince}
              >
                <Option value="พื้นที่ใกล้ฉัน">พื้นที่ใกล้ฉัน</Option>
                <Option value="">สถานที่ทั้งหมด</Option>
                {provinces.map((province) => (
                  <Option value={province} key={province}>
                    {province}
                  </Option>
                ))}
              </Select>
              {selectedCategory === 'ร้านอาหารและเครื่องดื่ม' ? (
                <>
                  <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
                    ราคา
                  </div>
                  <Select
                    className="mt-2 w-full"
                    onChange={handleSelectPriceRange}
                    value={selectedPriceRange}
                  >
                    <Option value={-1}>ทั้งหมด</Option>
                    {priceRanges.map((priceRange, idx) => (
                      <Option value={idx + 1} key={priceRange}>
                        {priceRange}
                      </Option>
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
                    ช่วงราคาสินค้า (บาท)
                  </div>
                  <Input.Group
                    size="small"
                    className="flex items-center justify-around"
                  >
                    <InputNumber
                      className="mt-2"
                      style={{ flex: '1 1 0%', textAlign: 'center' }}
                      placeholder="ราคาต่ำสุด"
                    />
                    <div className="mx-2" style={{ borderRight: '0px' }}>
                      -
                    </div>
                    <InputNumber
                      className="mt-2 "
                      style={{ flex: '1 1 0%', textAlign: 'center' }}
                      placeholder="ราคาสูงสุด"
                    />
                  </Input.Group>
                  <Button block className="mt-2" type="default">
                    ตกลง
                  </Button>
                </>
              )}
              {subCategories.length > 0 && (
                <>
                  <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
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
                </>
              )}
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
      <Drawer
        visible={openDrawer}
        onClose={() => setOpenDrawer(false)}
        closable={false}
        bodyStyle={{ padding: '0' }}
      >
        <div className="text-2xl  w-full h-16 bg-blue-900 text-white flex justify-center items-center relative">
          <div className="absolute left-0 top-auto ml-4">
            <LeftOutlined onClick={() => setOpenDrawer(false)} />
          </div>
          กรอกผล
        </div>
        <div className="bg-white p-4 w-full">
          <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
            ประเภทร้านค้า
          </div>
          <Radio.Group
            className="mt-4"
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
          <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
            จังหวัด/ใกล้ฉัน
          </div>
          <Select
            className="mt-2 w-full"
            onChange={handleSelectProvince}
            value={selectedProvince}
          >
            <Option value="พื้นที่ใกล้ฉัน">พื้นที่ใกล้ฉัน</Option>
            <Option value="">สถานที่ทั้งหมด</Option>
            {provinces.map((province) => (
              <Option value={province} key={province}>
                {province}
              </Option>
            ))}
          </Select>
          {selectedCategory === 'ร้านอาหารและเครื่องดื่ม' ? (
            <>
              <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
                ราคา
              </div>
              <Select
                className="mt-2 w-full"
                onChange={handleSelectPriceRange}
                value={selectedPriceRange}
              >
                <Option value={-1}>ทั้งหมด</Option>
                {priceRanges.map((priceRange, idx) => (
                  <Option value={idx + 1} key={priceRange}>
                    {priceRange}
                  </Option>
                ))}
              </Select>
            </>
          ) : (
            <>
              <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
                ช่วงราคาสินค้า (บาท)
              </div>
              <Input.Group
                size="small"
                className="flex items-center justify-around"
              >
                <InputNumber
                  className="mt-2"
                  style={{ flex: '1 1 0%', textAlign: 'center' }}
                  placeholder="ราคาต่ำสุด"
                />
                <div className="mx-2" style={{ borderRight: '0px' }}>
                  -
                </div>
                <InputNumber
                  className="mt-2 "
                  style={{ flex: '1 1 0%', textAlign: 'center' }}
                  placeholder="ราคาสูงสุด"
                />
              </Input.Group>
              <Button block className="mt-2" type="default">
                ตกลง
              </Button>
            </>
          )}
          {subCategories.length > 0 && (
            <>
              <div className="mt-6 first:mt-0 break-word text-base font-sans font-semibold text-black">
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
            </>
          )}
        </div>
      </Drawer>
    </PageContainer>
  )
}
