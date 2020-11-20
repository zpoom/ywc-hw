import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Breadcrumb, Radio, Select } from 'antd'
import data from '../../utils/data.json'
import { Card } from 'components/Card'
import { jsonAxios } from 'utils/axios'

const { Option } = Select

const BreadcrumbWrapper = styled.div`
  background-color: rgb(39, 57, 124);
  color: white;
  padding: 0.75rem;
`

const PageContainer = styled.div`
  background: url('result-bg.png');
  min-height: 100vh;
  background-size: contain;
  width: 100vw;
  /* background-repeat: no-repeat; */
  /* background-position: center center; */
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

  const handleChangeCategory = (event) => {
    const cat = event.target.value
    console.log()
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

  const handleChangeSubCategory = (event) => {}

  useEffect(() => {
    setMerchants(
      dataSource.merchants.filter(
        (d) =>
          selectedCategory.includes(d.categoryName) &&
          selectedProvince.includes(d.addressProvinceName),
      ),
    )
  }, [selectedCategory, selectedProvince])

  useEffect(() => {
    fetchJsonData()
  }, [])

  return (
    <PageContainer>
      {/* <div className="h-4 bg-white">
        <img src="/halfhalf-logo.png" />
      </div> */}
      <BreadcrumbWrapper>
        <Breadcrumb>
          <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
          <Breadcrumb.Item>ค้นหา</Breadcrumb.Item>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <div className="px-4 py-4 md:px-4 md:py-4">
        <div className="mt-8 first:mt-0 break-word text-xl font-sans font-semibold mb-4 ">
          {`ผลการค้นหา ${selectedCategory} ทั้งหมด`}
        </div>
        <div className="flex items-start">
          <div
            className="bg-white p-4 md:mr-8 md:block border rounded-sm border-gray-600"
            style={{ width: '22rem' }}
          >
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
            <Select className="w-full">
              <Option value="">ทั้งหมด</Option>
              {priceRanges.map((priceRange) => (
                <Option value={priceRange} key={priceRange}>
                  {priceRange}
                </Option>
              ))}
            </Select>
            <div className="mt-2 first:mt-0 break-word text-base font-sans font-semibold text-black">
              ประเภทอาหารและเครื่องดื่ม
            </div>
            <Radio.Group className="mt-2" onChange={handleChangeSubCategory}>
              {subCategories.length > 0 && (
                <>
                  <Radio style={{ display: 'block', height: '32px' }} value="">
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
