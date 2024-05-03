import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Page, Card, Layout, Tabs, Button, TextField, Select, BlockStack, EmptyState, Spinner, Modal, Link, Box, Checkbox, Divider, Scrollable, RangeSlider, Grid, InlineStack, Text, DropZone, LegacyStack, Thumbnail, ButtonGroup, Icon } from "@shopify/polaris";
import ToggleSwitch from './ToggleButton';
import ColorPicker from './ColorPicker';
import closeSvg from '../assets/close.svg'
import { ImCross } from "react-icons/im";
import { NoteMinor, DesktopMajor, MobileMajor, SearchMajor, MobileCancelMajor } from '@shopify/polaris-icons';
// import Information from './Information';
import useApi from '../components/customhooks/useApi';
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { AppContext } from "../components/providers";
import ShowPages from './ShowPages';
import { useParams, useNavigate } from "react-router-dom";
import { SkeltonPageWithTabs } from '../components/SkeltonPage'
import SuccessForm from './NavigationComponents/SuccessForm';
import BarContent from './NavigationComponents/BarContent';
import FormContent from './NavigationComponents/FormContent';
import { setDiscount } from '@shopify/app-bridge/actions/Cart';
function Information({ barName,
  setBarName,
  setTypeIds,
  typeIds,
  selectedRadioValue,
  setSelectedRadioValue,
  selectedCollections,
  setSelectedCollections,
  selectedProducts,
  setSelectedProducts,
  selectedPages,
  setSelectedPages,
  setSelectedBlogs,
  selectedBlogs,
  selectedBlogsIDs,
  setSelectedBlogsIDs,
  selectedPagesIDs,
  setSelectedPagesIDs,
  selectedCollectionsIDs,
  setSelectedCollectionsIDs,
  selectedProductsIDs,
  setSelectedProductsIDs,
  isDataInitialized,
  setIsDataInitialized
}) {
  const { shop, url } = useContext(AppContext);
  const appBridge = useAppBridge();
  const { callApi, loading } = useApi(appBridge, url);


  const [textFieldValue, setTextFieldValue] = useState("");
  const [apiResponse, setApiResponse] = useState();
  const [productsList, setProductsList] = useState();
  const [pagesList, setPagesList] = useState();
  const [collectionsList, setCollectionsList] = useState();
  const [blogsList, setBlogsList] = useState();


  const [collectionsModal, setCollectionsModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [pageModal, setPageModal] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);

  // useEffect(() => {
  //   console.log("selected products == ", selectedProducts)
  // }, [selectedProducts])

  const handleBarNameChange = useCallback(
    (newValue) => setBarName(newValue),
    [],
  );
  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
  }, []);

  const handleChangesCollectionsModal = useCallback(() => {
    setCollectionsModal(!collectionsModal);
  }, [collectionsModal]);
  const handleChangeProductModal = useCallback(() => {
    setProductModal(!productModal);
  }, [productModal]);
  const handleChangePageModal = useCallback(() => {
    setPageModal(!pageModal);
  }, [pageModal]);
  const handleChangeBlogModal = useCallback(() => {
    setBlogModalOpen(!blogModalOpen);
  }, [blogModalOpen]);



  const handleCollectionSelect = (id) => {
    const selectedCount = selectedCollectionsIDs.length;
    if (selectedCollectionsIDs?.includes(id)) {
      const newArray = selectedCollectionsIDs?.filter(
        (item) => item !== id
      );
      setSelectedCollectionsIDs(newArray);
    } else {
      setSelectedCollectionsIDs([...selectedCollectionsIDs, id]);
    }
  };
  const handleProductSelect = (id) => {
    const selectedCount = selectedProductsIDs.length;
    if (selectedProductsIDs?.includes(id)) {
      const newArray = selectedProductsIDs?.filter(
        (item) => item !== id
      );
      setSelectedProductsIDs(newArray);
    } else {
      setSelectedProductsIDs([...selectedProductsIDs, id]);
    }
  };
  const handlePageSelect = (id) => {
    const selectedCount = selectedPagesIDs.length;
    if (selectedPagesIDs?.includes(id)) {
      const newArray = selectedPagesIDs?.filter(
        (item) => item !== id
      );
      setSelectedPagesIDs(newArray);
    } else {
      setSelectedPagesIDs([...selectedPagesIDs, id]);
    }
    // console.log(selectedPagesIDs);
  };
  const handleBlogSelect = (id) => {
    const selectedCount = selectedBlogsIDs.length;
    if (selectedBlogsIDs?.includes(id)) {
      const newArray = selectedBlogsIDs?.filter(
        (item) => item !== id
      );
      setSelectedBlogsIDs(newArray);
    } else {
      setSelectedBlogsIDs([...selectedBlogsIDs, id]);
    }
    // console.log(selectedBlogsIDs);
  };
  const handleCollectionsSaveModal = () => {
    setCollectionsModal(false);
    const selectedProd = collectionsList.filter((product) =>
      selectedCollectionsIDs.includes(product.id)
    );

    setSelectedCollections(selectedProd);
  };
  const handleProductsSaveModal = () => {
    setProductModal(false);
    const selectedProd = productsList.filter((product) =>
      selectedProductsIDs.includes(product.id)
    );

    setSelectedProducts(selectedProd);
  };
  const handlePageSaveModal = () => {
    setPageModal(false);
    const selectedProd = pagesList?.filter((product) =>
      selectedPagesIDs?.includes(product.id)
    );
    // console.log(selectedProd);

    setSelectedPages(selectedProd);

  };

  const handleBlogSaveModal = () => {
    setBlogModalOpen(false);
    const selectedProd = blogsList.filter((product) =>
      selectedBlogsIDs.includes(product.id)
    );
    // console.log(selectedProd);
    setSelectedBlogs(selectedProd);
  }

  const handleRemoveCollection = (productId) => {
    const newArray = selectedCollections.filter(
      (product) => product?.id !== productId
    );
    const newIdsArray = selectedCollectionsIDs.filter(
      (id) => id !== productId
    );
    setSelectedCollectionsIDs(newIdsArray);
    setSelectedCollections(newArray);
  };
  const handleRemoveProducts = (productId) => {
    const newArray = selectedProducts.filter(
      (product) => product?.id !== productId
    );
    const newIdsArray = selectedProductsIDs.filter(
      (id) => id !== productId
    );
    setSelectedProductsIDs(newIdsArray);
    setSelectedProducts(newArray);
  };
  const handleRemovePages = (productId) => {
    const newArray = selectedPages.filter(
      (product) => product?.id !== productId
    );
    const newIdsArray = selectedPagesIDs.filter(
      (id) => id !== productId
    );
    setSelectedPagesIDs(newIdsArray);
    setSelectedPages(newArray);
  };

  const handleRemoveBlogs = (blogId) => {
    const newArray = selectedBlogs.filter(
      (blog) => blog?.id !== blogId
    );
    const newIdsArray = selectedBlogsIDs.filter(
      (id) => id !== blogId
    );
    setSelectedBlogsIDs(newIdsArray);
    setSelectedBlogs(newArray);
  };



  const handleRadioChange = (newValue) => {
    setSelectedRadioValue(newValue);
  };

  const getProducts = async () => {
    if (selectedRadioValue != "homee") {
      const response = await callApi(`get-data?type=${selectedRadioValue}&value=${textFieldValue}`, "GET");

      // console.log("response", response.data);

      if (response?.data) {
        setApiResponse(response?.data);
      }
      // console.log("response", response?.data);
      if (selectedRadioValue === "products") {
        setProductsList(response?.data);
        if (isDataInitialized) {
          setSelectedProducts(response?.data.filter((product) => selectedProductsIDs.includes(product?.id)));
        }
      } else if (selectedRadioValue === "collections") {
        setCollectionsList(response?.data);
        if (isDataInitialized) {
          setSelectedCollections(response?.data.filter((product) => selectedCollectionsIDs.includes(product?.id)));
        }
      } else if (selectedRadioValue === "pages") {
        setPagesList(response?.data);
        if (isDataInitialized) {
          setSelectedPages(response?.data.filter((product) => selectedPagesIDs.includes(product?.id)));
        }
      } else if (selectedRadioValue === "blogs") {
        setBlogsList(response?.data);
        if (isDataInitialized) {
         setSelectedBlogs(response?.data.filter((product) => selectedBlogsIDs.includes(product?.id)));
        }
      }
      setIsDataInitialized(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, [selectedRadioValue, textFieldValue]);

  // useEffect(() => {
  //   console.log('selectedRadioValue', selectedRadioValue)
  // })

  useEffect(() => {
    const Ids = selectedRadioValue === "products" ? selectedProductsIDs : selectedRadioValue === "pages" ? selectedPagesIDs : selectedRadioValue === "blogs" ? selectedBlogsIDs : selectedRadioValue === "collections" ? selectedCollectionsIDs : "";
    setTypeIds(Ids)
    // console.log("typeIds", typeIds);
  }, [selectedProductsIDs, selectedPagesIDs, selectedBlogsIDs, selectedCollectionsIDs, barName])


  return (
    <>
      <Modal
        open={collectionsModal}
        size="fullScreen"
        onClose={handleChangesCollectionsModal}
        title="Add Collection"
        primaryAction={{
          content: "Add",
          // disabled: !selectedRelatedProductsIDs.length,
          onAction: handleCollectionsSaveModal,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleCollectionsSaveModal,
          },
        ]}
      >
        <Box
          paddingBlockStart="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
          paddingBlockEnd="400"
        >
          <TextField
            labelHidden
            type="text"
            placeholder="Search collections"
            value={textFieldValue}
            prefix={<Icon source={SearchMajor} tone="base" />}
            onChange={handleTextFieldChange}
            autoComplete="off"
          />
        </Box>
        <Divider borderWidth={1} />
        <div className="product-lists">
          <Scrollable horizontal vertical className="yr5fA CyBRb">
            {loading ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner size="large" />
              </div>
            ) : collectionsList?.length ? (
              collectionsList?.map((product, i) => {
                const isSelectedId =
                  selectedCollectionsIDs?.includes(
                    product.id
                  );
                const isCheckboxDisabled =
                  selectedCollectionsIDs.length >= 5 &&
                  !isSelectedId;
                return (
                  <div
                    className="product-list-item"
                    style={{
                      backgroundColor: isCheckboxDisabled
                        ? "var(--p-color-bg-surface-secondary)"
                        : "unset",
                      color: isCheckboxDisabled
                        ? "var(--p-color-text-disabled)"
                        : "unset",
                    }}
                    key={i}
                  >
                    <Checkbox
                      labelHidden
                      checked={isSelectedId}
                      disabled={isCheckboxDisabled}
                      onChange={() =>
                        handleCollectionSelect(
                          product.id
                        )
                      }
                    />
                    <div
                      className="product-list-item-product-title"
                      onClick={() =>
                        handleCollectionSelect(
                          product.id
                        )
                      }
                    >
                      <div className="product-list-item-product-title-inner flex gap-4 items-center">
                        <div className="product-list-item-product-title-thumbnail">
                          <Thumbnail
                            source={product?.image}
                            size="small"
                          />
                        </div>
                        <div className="product-list-item-product-title-text">
                          <div className="ExJYf">
                            <div className="K2zxu">
                              <span>
                                {product?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text as="h2" variant="headingMd">
                  No Product Found
                </Text>
              </div>
            )}
          </Scrollable>
        </div>
      </Modal>
      <Modal
        open={productModal}
        size="fullScreen"
        onClose={handleChangeProductModal}
        title="Add Products"
        primaryAction={{
          content: "Add",
          // disabled: !selectedRelatedProductsIDs.length,
          onAction: handleProductsSaveModal,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChangeProductModal,
          },
        ]}
      >
        <Box
          paddingBlockStart="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
          paddingBlockEnd="400"
        >
          <TextField
            labelHidden
            type="text"
            placeholder="Search products"
            value={textFieldValue}
            prefix={<Icon source={SearchMajor} tone="base" />}
            onChange={handleTextFieldChange}
            autoComplete="off"
          />
        </Box>
        <Divider borderWidth={1} />
        <div className="product-lists">
          <Scrollable horizontal vertical className="yr5fA CyBRb">
            {loading ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner size="large" />
              </div>
            ) : productsList?.length ? (
              productsList?.map((product, i) => {
                const isSelectedId =
                  selectedProductsIDs?.includes(
                    product.id
                  );
                const isCheckboxDisabled =
                  selectedProductsIDs.length >= 5 &&
                  !isSelectedId;
                return (
                  <div
                    className="product-list-item"
                    style={{
                      backgroundColor: isCheckboxDisabled
                        ? "var(--p-color-bg-surface-secondary)"
                        : "unset",
                      color: isCheckboxDisabled
                        ? "var(--p-color-text-disabled)"
                        : "unset",
                    }}
                    key={i}
                  >
                    <Checkbox
                      labelHidden
                      checked={isSelectedId}
                      disabled={isCheckboxDisabled}
                      onChange={() =>
                        handleProductSelect(
                          product.id
                        )
                      }
                    />
                    <div
                      className="product-list-item-product-title"
                      onClick={() =>
                        handleProductSelect(
                          product.id
                        )
                      }
                    >
                      <div className="product-list-item-product-title-inner flex gap-4 items-center">
                        <div className="product-list-item-product-title-thumbnail">
                          <Thumbnail
                            source={product?.image}
                            size="small"
                          />
                        </div>
                        <div className="product-list-item-product-title-text">
                          <div className="ExJYf">
                            <div className="K2zxu">
                              <Text
                                as="span"
                                variant="bodyMd"
                                tone="base"
                              >
                                {product?.title}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text as="h2" variant="headingMd">
                  No Product Found
                </Text>
              </div>
            )}
          </Scrollable>
        </div>
      </Modal>
      <Modal
        open={blogModalOpen}
        size="fullScreen"
        onClose={handleChangeBlogModal}
        title="Add Blogs"
        primaryAction={{
          content: "Add",
          // disabled: !selectedRelatedProductsIDs.length,
          onAction: handleBlogSaveModal,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChangeBlogModal,
          },
        ]}
      >
        <Box
          paddingBlockStart="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
          paddingBlockEnd="400"
        >
          <TextField
            labelHidden
            type="text"
            placeholder="Search blogs"
            value={textFieldValue}
            prefix={<Icon source={SearchMajor} tone="base" />}
            onChange={handleTextFieldChange}
            autoComplete="off"
          />
        </Box>
        <Divider borderWidth={1} />
        <div className="product-lists">
          <Scrollable horizontal vertical className="yr5fA CyBRb">
            {loading ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner size="large" />
              </div>
            ) : blogsList?.length ? (
              blogsList?.map((blog, i) => {
                const isSelectedId =
                  selectedBlogsIDs?.includes(
                    blog.id
                  );
                const isCheckboxDisabled =
                  selectedBlogsIDs.length >= 5 &&
                  !isSelectedId;
                return (
                  <div
                    className="product-list-item"
                    style={{
                      backgroundColor: isCheckboxDisabled
                        ? "var(--p-color-bg-surface-secondary)"
                        : "unset",
                      color: isCheckboxDisabled
                        ? "var(--p-color-text-disabled)"
                        : "unset",
                    }}
                    key={i}
                  >
                    <Checkbox
                      labelHidden
                      checked={isSelectedId}
                      disabled={isCheckboxDisabled}
                      onChange={() => handleBlogSelect(blog.id)}
                    />
                    <div
                      className="product-list-item-product-title"
                      onClick={() =>
                        handleBlogSelect(
                          blog.id
                        )
                      }
                    >
                      <div className="product-list-item-product-title-inner flex gap-4 items-center">
                        <div className="product-list-item-product-title-text">
                          <div className="ExJYf">
                            <div className="K2zxu">
                              <span>
                                {blog?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text as="h2" variant="headingMd">
                  No Product Found
                </Text>
              </div>
            )}
          </Scrollable>
        </div>
      </Modal>
      <Modal
        open={pageModal}
        size="fullScreen"
        onClose={handleChangePageModal}
        title="Add Pages"
        primaryAction={{
          content: "Add",
          // disabled: !selectedRelatedProductsIDs.length,
          onAction: handlePageSaveModal,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChangePageModal,
          },
        ]}
      >
        <Box
          paddingBlockStart="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
          paddingBlockEnd="400"
        >
          <TextField
            labelHidden
            type="text"
            placeholder="Search pages"
            value={textFieldValue}
            prefix={<Icon source={SearchMajor} tone="base" />}
            onChange={handleTextFieldChange}
            autoComplete="off"
          />
        </Box>
        <Divider borderWidth={1} />
        <div className="product-lists">
          <Scrollable horizontal vertical className="yr5fA CyBRb">
            {loading ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner size="large" />
              </div>
            ) : pagesList?.length ? (
              pagesList?.map((page, i) => {
                const isSelectedId =
                  selectedPagesIDs?.includes(
                    page.id
                  );
                const isCheckboxDisabled =
                  selectedPagesIDs.length >= 5 &&
                  !isSelectedId;
                return (
                  <div
                    className="product-list-item"
                    style={{
                      backgroundColor: isCheckboxDisabled
                        ? "var(--p-color-bg-surface-secondary)"
                        : "unset",
                      color: isCheckboxDisabled
                        ? "var(--p-color-text-disabled)"
                        : "unset",
                    }}
                    key={i}
                  >
                    <Checkbox
                      labelHidden
                      checked={isSelectedId}
                      disabled={isCheckboxDisabled}
                      onChange={() =>
                        handlePageSelect(
                          page.id
                        )
                      }
                    />
                    <div
                      className="product-list-item-product-title"
                      onClick={() =>
                        handlePageSelect(
                          page.id
                        )
                      }
                    >
                      <div className="product-list-item-product-title-inner flex gap-4 items-center">
                        <div className="product-list-item-product-title-text">
                          <div className="ExJYf">
                            <div className="K2zxu">
                              <span>
                                {page?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text as="h2" variant="headingMd">
                  No Product Found
                </Text>
              </div>
            )}
          </Scrollable>
        </div>
      </Modal>
      <BlockStack gap="500" align='center'>
        <Card sectioned title="Page Bar Name">
          <BlockStack gap="500" align='center'>
            <Text as="h2" variant="headingSm">
              Page Bar Name
            </Text>
            <div className='w-1/3'>
              <TextField
                label="Bar name"
                value={barName}
                onChange={handleBarNameChange}
                autoComplete="off"
              />
            </div>
          </BlockStack>
        </Card>

        <ShowPages selectedValue={selectedRadioValue} handleChange={handleRadioChange} />
        {
          selectedRadioValue === 'collections' && (
            <Card sectioned title="Page Bar Name">
              <BlockStack gap="200" align='center'>
                <Text as="h2" variant="headingSm">
                  Add Collections
                </Text>
                <Text as="p" variant="bodyMd">
                  Select collections where you want to show the page bar
                </Text>

                <TextField
                  labelHidden
                  type="text"
                  placeholder="Search collections"
                  value={textFieldValue}
                  prefix={<Icon source={SearchMajor} tone="base" />}
                  onChange={handleTextFieldChange}
                  autoComplete="off"
                  connectedRight={
                    <Button
                      size="large"
                      onClick={handleChangesCollectionsModal}
                    >
                      Browse
                    </Button>
                  }
                />
                <div className='mb-5'>
                </div>
                {
                  selectedCollections.map((data, i) => (
                    <div key={data.id}>
                      <InlineStack align='space-between' blockAlign='center'>
                        <InlineStack gap={2} blockAlign='center'>
                          <div className='mr-5'>
                            <Thumbnail
                              source={data?.image}
                              size="small"
                            />
                          </div>
                          <BlockStack gap={1}>
                            <Link
                              url={`https://admin.shopify.com/store/`}
                            >
                              {data?.title}
                            </Link>
                            <Text as="span" variant="bodyMd" tone='base'>
                              {data?.price}
                            </Text>
                          </BlockStack>
                        </InlineStack>
                        <div className="close-btn">
                          <Button
                            onClick={() =>
                              handleRemoveCollection(
                                data
                                  ?.id
                              )
                            }
                            variant="plain"
                            icon={
                              MobileCancelMajor
                            }
                          ></Button>
                        </div>
                      </InlineStack>
                    </div>
                  ))
                }
              </BlockStack>
            </Card>
          )
        }

        {
          selectedRadioValue === 'products' && (
            <Card sectioned title="Page Bar Name">
              <BlockStack gap="200" align='center'>
                <Text as="h2" variant="headingSm">
                  Add Products
                </Text>
                <Text as="p" variant="bodyMd">
                  Select products where you want to show the page bar
                </Text>

                <TextField
                  labelHidden
                  type="text"
                  placeholder="Search products"
                  value={textFieldValue}
                  prefix={<Icon source={SearchMajor} tone="base" />}
                  onChange={handleTextFieldChange}
                  autoComplete="off"
                  connectedRight={
                    <Button
                      size="large"
                      onClick={handleChangeProductModal}
                    >
                      Browse
                    </Button>
                  }
                />
                <div className='mb-5'>
                </div>
                {
                  selectedProducts.map((data, i) => (
                    <div key={data.id}>
                      <InlineStack align='space-between' blockAlign='center'>
                        <InlineStack gap={2} blockAlign='center'>
                          <div className='mr-5'>
                            <Thumbnail
                              source={data?.image}
                              size="small"
                            />
                          </div>
                          <BlockStack gap={1}>
                            <Link
                              url={`https://admin.shopify.com/store/`}
                            >
                              {data?.title}
                            </Link>
                            <Text as="span" variant="bodyMd" tone="base"
                            >
                              {data?.price}
                            </Text>
                          </BlockStack>
                        </InlineStack>
                        <div className="close-btn">
                          <Button
                            onClick={() =>
                              handleRemoveProducts(
                                data
                                  ?.id
                              )
                            }
                            variant="plain"
                            icon={
                              MobileCancelMajor
                            }
                          ></Button>
                        </div>
                      </InlineStack>
                    </div>
                  ))

                }
              </BlockStack>
            </Card>
          )
        }

        <div className='mb-5'>
          {
            selectedRadioValue === 'pages' && (
              <Card sectioned title="Page Bar Name" className="mb-5">
                <BlockStack gap="200" align='center'>
                  <Text as="h2" variant="headingSm">
                    Add Pages
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select pages where you want to show the page bar
                  </Text>

                  <TextField
                    labelHidden
                    type="text"
                    placeholder="Search pages"
                    value={textFieldValue}
                    prefix={<Icon source={SearchMajor} tone="base" />}
                    onChange={handleTextFieldChange}
                    autoComplete="off"
                    connectedRight={
                      <Button
                        size="large"
                        onClick={handleChangePageModal}
                      >
                        Browse
                      </Button>
                    }
                  />
                  <div className='mb-5'>
                  </div>
                  {
                    selectedPages.map((data, i) => (
                      <div key={data.id}>
                        <InlineStack align='space-between' blockAlign='center'>
                          <Link
                            url={`https://admin.shopify.com/store/`}
                          >
                            {data?.title}
                          </Link>
                          <Button
                            onClick={() =>
                              handleRemovePages(
                                data?.id
                              )
                            }
                            variant="plain"
                            icon={
                              MobileCancelMajor
                            }
                          ></Button>
                        </InlineStack>
                        {/* {console.log(data)} */}
                      </div>
                    ))

                  }
                </BlockStack>
              </Card>
            )
          }
          {
            selectedRadioValue === 'blogs' && (
              <Card sectioned title="Page Bar Name" className="mb-5">
                <BlockStack gap="200" align='center'>
                  <Text as="h2" variant="headingSm">
                    Add Blogs
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select blogs where you want to show the page bar
                  </Text>

                  <TextField
                    labelHidden
                    type="text"
                    placeholder="Search Blogs"
                    value={textFieldValue}
                    prefix={<Icon source={SearchMajor} tone="base" />}
                    onChange={handleTextFieldChange}
                    autoComplete="off"
                    connectedRight={
                      <Button
                        size="large"
                        onClick={handleChangeBlogModal}
                      >
                        Browse
                      </Button>
                    }
                  />
                  <div className='mb-5'>
                  </div>
                  {
                    selectedBlogs.map((data, i) => (
                      <div key={data.id}>
                        <InlineStack align='space-between' blockAlign='center'>
                          <Link
                            url={`https://admin.shopify.com/store/`}
                          >
                            {data?.title}
                          </Link>
                          <Button
                            onClick={() =>
                              handleRemoveBlogs(
                                data?.id
                              )
                            }
                            variant="plain"
                            icon={
                              MobileCancelMajor
                            }
                          ></Button>
                        </InlineStack>
                        {/* {console.log(data)} */}
                      </div>
                    ))
                  }
                </BlockStack>
              </Card>
            )
          }

        </div>
      </BlockStack>
    </>
  );
}

// function BarContent({
//   title,
//   scroll,
//   btnText,
//   btnLink,
//   showBtn,
//   titleColor,
//   barColor,
//   btnColor,
//   btnTextColor,
//   closeBtnColor,
//   titleSize,
//   titleWeight,
//   buttonTextSize,
//   buttonTextWeight,
//   activeView,
//   handleColorChange,
//   handleSliderChange,
//   handleStepedSliderChange,
//   handleInputChange,
//   handleToggleChange,
//   setTitleColor,
//   setBarColor,
//   setBtnColor,
//   setBtnTextColor,
//   setCloseBtnColor,
//   setTitleSize,
//   setTitleWeight,
//   setButtonTextSize,
//   setButtonTextWeight,
//   setActiveView,
//   setTitle,
//   setScroll,
//   setBtnText,
//   setBtnLink,
//   setShowBtn,
//   barFile,
//   setBarFile,
//   handleBarDropZone
// }) {

//   const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
//   const textFieldID = 'ruleContent';
//   const fileUpload = !barFile && <DropZone.FileUpload />;
//   const uploadedFile = barFile && (
//     <LegacyStack>
//       <Thumbnail
//         size="small"
//         alt={barFile.name}
//         source={validImageTypes.includes(barFile.type) ? window.URL.createObjectURL(barFile) : NoteMinor}
//       />
//     </LegacyStack>
//   );

//   const handleViewChange = useCallback(
//     (view) => {
//       if (activeView === view) return;
//       setActiveView(view);
//     },
//     [activeView],
//   );

//   return (
//     <Grid columns={{ sm: 3 }}>
//       <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 9, lg: 9, xl: 9 }}>
//         <Card title="Sales"  >
//           <div className='flex justify-center items-center my-5'>
//             <ButtonGroup variant="segmented">
//               <Button
//                 pressed={activeView === "desktop"}
//                 onClick={() => handleViewChange("desktop")}
//                 icon={DesktopMajor}
//                 size='Slim'

//               >
//               </Button>
//               <Button
//                 pressed={activeView === "mobile"}
//                 onClick={() => handleViewChange("mobile")}
//                 icon={MobileMajor}
//                 size='Slim'
//               >
//               </Button>
//             </ButtonGroup>
//           </div>
//           {
//             activeView === "desktop" ? (
//               <div style={{ minHeight: '550px' }} className='relative bg-[#E2E2E2] rounded-2xl'>
//                 {/* <div className="absolute left-1/2 top-0 z-10 h-4 w-28 -translate-x-1/2 rounded-b-xl bg-stone-950">
//                     <div className="absolute left-1/2 top-1 h-1 w-7 -translate-x-1/2 rounded-full  bg-stone-500"></div>
//                     <div className="absolute right-6 top-0 h-2.5 w-2.5 rounded-full border-2 border-stone-800 bg-stone-900"></div>
//                   </div> */}
//                 <div className="w-full absolute rounded-b-2xl  bottom-0 left-0 px-2 py-1" style={{ backgroundColor: barColor }}>
//                   <div className={`flex ${showBtn ? 'justify-between' : 'justify-around'} items-center justify-around`}>
//                     {
//                       barFile && (
//                         <img className='-mt-8 size-16' src={barFile && window.URL.createObjectURL(barFile)} alt='' />
//                       )
//                     }
//                     <h4 className='font-bold text-2xl ml-32' style={{ color: titleColor, fontWeight: titleWeight, fontSize: titleSize }}>
//                       {title || 'Would you like to Get 20% Discount?'}
//                     </h4>
//                     {
//                       showBtn && (
//                         <button href={btnLink} style={{ backgroundColor: btnColor, fontWeight: buttonTextWeight, fontSize: buttonTextSize, color: btnTextColor }} className='px-16 mr-20 text-xl font-bold'>
//                           {btnText || 'Get?'}
//                         </button>
//                       )
//                     }
//                     <span className='w-7 h-7 flex justify-center items-center rounded-full'>
//                       <ImCross className='size-5  ' style={{ color: closeBtnColor }} />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div style={{ minHeight: '550px' }} className='relative bg-[#E2E2E2] max-w-[260px] mx-auto rounded-[24px] '>
//                 <div className='w-full absolute bottom-0 left-0'>
//                   <BlockStack >
//                     <div className=" px-2 py-2" style={{ backgroundColor: barColor }}>
//                       <div className='flex justify-between items-center py-1'>
//                         <span className='w-7 h-7 flex justify-center items-center rounded-full'>
//                           <ImCross className='w-4 h-4 ' style={{ color: closeBtnColor }} />
//                         </span>
//                         <h4 className='font-semibold text-base break-all text-center leading-8' style={{ color: titleColor, fontWeight: titleWeight, fontSize: (titleSize - 5) }}>
//                           {title || 'Would you like to Get 20% Discount?'}
//                         </h4>
//                       </div>
//                     </div>
//                     {
//                       showBtn && (
//                         <button href={btnLink} style={{ backgroundColor: btnColor, fontWeight: buttonTextWeight, fontSize: buttonTextSize, color: btnTextColor }} className='px-10 w-full py-1 rounded-b-2xl text-xl font-bold'>
//                           {btnText || 'Get?'}
//                         </button>
//                       )
//                     }
//                   </BlockStack>
//                 </div>
//               </div>
//             )
//           }

//         </Card>
//       </Grid.Cell>
//       <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
//         <div className='overflow-y-auto'>
//           <BlockStack gap="300" align='center'>
//             <Card sectioned>
//               <div className='h-[calc(100vh-220px)]'>
//                 <BlockStack gap="300">
//                   <InlineStack gap="200" align='space-between' blockAlign='center'>
//                     <span>Image</span>
//                     <div className='w-10 h-10'>
//                       <DropZone allowMultiple={false} onDrop={handleBarDropZone}>
//                         {uploadedFile}
//                         {fileUpload}
//                       </DropZone>
//                     </div>
//                   </InlineStack>
//                   {
//                     barFile && (
//                       <Button icon={DeleteMinor} onClick={() => setBarFile(null)} >Remove Image</Button>
//                     )
//                   }
//                   <TextField label="Title" value={title} onChange={handleInputChange(setTitle)} autoComplete="off" />
//                   <TextField label="Scroll %" value={scroll} onChange={handleInputChange(setScroll)} autoComplete="off" />
//                   {/* <InlineStack gap="200" align='space-between'>
//                     <span>Button</span>
//                     <ToggleSwitch checked={showBtn} onChange={handleToggleChange} round />
//                   </InlineStack> */}
//                   {
//                     showBtn && (
//                       <>
//                         <TextField label="Button Text" value={btnText} onChange={handleInputChange(setBtnText)} autoComplete="off" />
//                         {/* <TextField label="Button Link" value={btnLink} onChange={handleInputChange(setBtnLink)} autoComplete="off" /> */}
//                       </>
//                     )
//                   }
//                   <ColorPicker value={titleColor} onChange={handleColorChange(setTitleColor)} label="Title" />
//                   <ColorPicker value={barColor} onChange={handleColorChange(setBarColor)} label="Bar" />
//                   {
//                     showBtn && (
//                       <>
//                         <ColorPicker value={btnColor} onChange={handleColorChange(setBtnColor)} label="Button" />
//                         <ColorPicker value={btnTextColor} onChange={handleColorChange(setBtnTextColor)} label="Button Text" />
//                       </>
//                     )
//                   }
//                   <ColorPicker value={closeBtnColor} onChange={handleColorChange(setCloseBtnColor)} label="Close Button" />

//                   <RangeSlider label="Title Text" value={titleSize} max={32} min={16} onChange={handleSliderChange(setTitleSize)} output />
//                   {/* <RangeSlider output label="Tittle weight" min={100} max={800} step={100} value={titleWeight} onChange={handleStepedSliderChange(setTitleWeight)} /> */}
//                   {
//                     showBtn && (
//                       <>
//                         <RangeSlider label="Button Text" value={buttonTextSize} max={26} min={16} onChange={handleSliderChange(setButtonTextSize)} output />
//                         {/* <RangeSlider output label="Button Text weight" min={100} max={800} step={100} value={buttonTextWeight} onChange={handleStepedSliderChange(setButtonTextWeight)} /> */}
//                       </>
//                     )
//                   }
//                 </BlockStack>
//               </div>
//             </Card>
//           </BlockStack>
//         </div>
//       </Grid.Cell>
//     </Grid >
//   );
// };

// const FormContent = ({ onFormSectionChange, formTitle,
//   setFormTitle,
//   formSubtitle,
//   setFormSubtitle,
//   formPrimaryBtnText,
//   setFormPrimaryBtnText,
//   formPrimaryBtnLink,
//   setFormPrimaryBtnLink,
//   formSecondaryBtnText,
//   setFormSecondaryBtnText,
//   formSecondaryBtnLink,
//   setFormSecondaryBtnLink,
//   formWarningText,
//   setFormWarningText,
//   formFile,
//   setFormFile,
//   formSection,
//   setFormSection,
//   formName,
//   setFormName,
//   formEmail,
//   setFormEmail,
//   formPhone,
//   setFormPhone,
//   formTitleColor,
//   setFormTitleColor,
//   formSubtitleColor,
//   setFormSubtitleColor,
//   formBtnColor,
//   setFormBtnColor,
//   formBtnTextColor,
//   setFormBtnTextColor,
//   formRejectTextColor,
//   setFormRejectTextColor,
//   formBgColor,
//   setFormBgColor,
//   formCloseBtnColor,
//   setFormCloseBtnColor,
//   formTitleSize,
//   setFormTitleSize,
//   formTitleWeight,
//   setFormTitleWeight,
//   formSubtitleSize,
//   setFormSubtitleSize,
//   formSubtitleWeight,
//   setFormSubtitleWeight,
//   formButtonTextSize,
//   setFormButtonTextSize,
//   formButtonTextWeight,
//   handleDropZoneDrop,
//   formDiscountCode,
//   setFormDiscountCode,
//   formDiscount,
//   setFormDiscount,
//   setFormSecondaryBtnTextColor,
//   setFormSecondaryBtnColor,
//   formSecondaryBtnTextColor,
//   formSecondaryBtnColor,
//   isInvalidDiscountCode,
//   isInvalidDiscount,
//   setFormButtonTextWeight,
//   formRadius,
//   setFormRadius,
//   formBtnRadius,
//   setFormBtnRadius,
//   formFieldsRadius,
//   setFormFieldsRadius
// }) => {
//   const [activeView, setActiveView] = useState('desktop');
//   const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
//   const textFieldID = 'ruleContent';
//   const fileUpload = !formFile && <DropZone.FileUpload />;
//   const uploadedFile = formFile && (
//     <LegacyStack>
//       <Thumbnail
//         size="small"
//         alt={formFile.name}
//         source={validImageTypes.includes(formFile.type) ? window.URL.createObjectURL(formFile) : NoteMinor}
//       />
//     </LegacyStack>
//   );

//   const handleViewChange = useCallback(
//     (view) => {
//       if (activeView === view) return;
//       setActiveView(view);
//     },
//     [activeView],)

//   return (
//     <Grid columns={{ sm: 3 }}>
//       <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 9, lg: 9, xl: 9 }}>
//         <Card title="Sales">
//           <div className='flex justify-center items-center my-5'>
//             <ButtonGroup variant="segmented">
//               <Button
//                 pressed={activeView === "desktop"}
//                 onClick={() => handleViewChange("desktop")}
//                 icon={DesktopMajor}
//                 size='Slim'

//               >
//               </Button>
//               <Button
//                 pressed={activeView === "mobile"}
//                 onClick={() => handleViewChange("mobile")}
//                 icon={MobileMajor}
//                 size='Slim'
//               >
//               </Button>
//             </ButtonGroup>
//           </div>


//           {
//             activeView === "desktop" ? (
//               formSection && (
//                 <div className='min-h-[550px] bg-[#E2E2E2] flex justify-center rounded-[24px] items-center'>
//                   <div className='flex '>
//                     {formFile && <img className='max-w-[300px]' src={validImageTypes?.includes(formFile?.type) ? window.URL.createObjectURL(formFile) : NoteMinor} alt="image" />}
//                     <div className="relative  p-6 w-[400px] shadow-lg flex justify-center items-center text-center gap-2 flex-col" style={{ backgroundColor: formBgColor, borderRadius: formRadius }}>
//                       {/* <span className='w-9 h-9 absolute top-2 right-1 flex justify-center items-center cursor-pointer rounded-full' style={{ backgroundColor: formCloseBtnColor }}>
//                       <ImCross className='w-4 h-4' />
//                     </span> */}
//                       <div className='flex justify-end w-full'>
//                         <ImCross className=' size-5' style={{ color: formCloseBtnColor }} />
//                       </div>
//                       <p className="text-gray-600 mb-2 font-semibold  max-w-[90%]" style={{ color: formTitleColor, fontSize: formTitleSize, lineHeight: 1.2 }}>
//                         {formTitle || "Would you like to get 20% discount?"}
//                       </p>
//                       <p className="text-gray-600 text-xl font-normal mb-2 max-w-[90%]" style={{ color: formSubtitleColor, fontSize: formSubtitleSize }}>
//                         {formSubtitle || "Would you like to get 20% discount?"}
//                       </p>
//                       {/* {formFile && <img className='max-w-[80%]' src={validImageTypes?.includes(formFile?.type) ? window.URL.createObjectURL(formFile) : NoteMinor} alt="image" />} */}
//                       {formName && <input type="text" className="bg-[#E4B16A] text-2xl placeholder-black max-w-full focus:outline-none opacity-60 block w-full p-2.5" style={{ borderRadius: formFieldsRadius }} placeholder="name" required />}
//                       {formEmail && <input type="text" className="bg-[#E4B16A] text-2xl placeholder-black max-w-full focus:outline-none opacity-60 block w-full p-2.5" style={{ borderRadius: formFieldsRadius }} placeholder="email" required />}
//                       {formPhone && <input type="text" className="bg-[#E4B16A] text-2xl placeholder-black max-w-full focus:outline-none opacity-60 block w-full p-2.5" style={{ borderRadius: formFieldsRadius }} placeholder="phone" required />}
//                       <button href='#' className="bg-black text-white px-12 py-2 text-2xl font-bold mt-8" style={{ backgroundColor: formBtnColor, color: formBtnTextColor, borderRadius: formBtnRadius, fontSize: formButtonTextSize }}>
//                         {formPrimaryBtnText || "Confirm"}
//                       </button>
//                       {/* <a className='text-2xl font-bold underline' style={{ color: formRejectTextColor, fontSize: formButtonTextSize, fontWeight: formButtonTextWeight }} href='#'>
//                       {formSecondaryBtnText || "No, thanks"}
//                     </a>
//                     <span className='text-white'>{formWarningText || "Suitable for GDPR structure"}</span> */}
//                     </div>
//                   </div>
//                 </div>
//               )
//             ) : (
//               <div className='flex justify-center items-center my-5'>
//                 <div className='min-h-[550px] bg-[#E2E2E2] flex justify-center max-w-[260px] rounded-[24px]  items-end '>
//                   <div className='flex flex-col'>
//                     {formFile && <img className='max-w-[260px]' src={validImageTypes?.includes(formFile?.type) ? window.URL.createObjectURL(formFile) : NoteMinor} alt="image" />}

//                     <div className="relative  p-2 w-[260px] shadow-lg flex justify-center items-center rounded-b-[24px] text-center gap-1 flex-col" style={{ backgroundColor: formBgColor }}>
//                       {/* <span className='w-9 h-9 absolute top-2 right-1 flex justify-center items-center cursor-pointer rounded-full' style={{ backgroundColor: formCloseBtnColor }}>
//                       <ImCross className='w-4 h-4' />
//                       </span> */}
//                       <div className='flex justify-end w-full'>
//                         <ImCross className=' size-5' style={{ color: formCloseBtnColor }} />
//                       </div>
//                       <p className="text-gray-600 mb-2  max-w-[90%]" style={{ color: formTitleColor, fontSize: (formTitleSize - 12), lineHeight: 1.2 }}>
//                         {formTitle || "Would you like to get 20% discount?"}
//                       </p>
//                       <p className="text-gray-600 text-xl font-bold mb-2 max-w-[90%]" style={{ color: formSubtitleColor, fontSize: (formSubtitleSize - 12), fontWeight: formSubtitleWeight }}>
//                         {formSubtitle || "Subtitle will be here"}
//                       </p>
//                       {/* {formFile && <img className='max-w-[80%]' src={validImageTypes?.includes(formFile?.type) ? window.URL.createObjectURL(formFile) : NoteMinor} alt="image" />} */}
//                       {formName && <input type="text" className="bg-[#E4B16A] text-2xl placeholder-black focus:outline-none opacity-60 block w-full p-2.5" style={{ borderRadius: formFieldsRadius }} placeholder="name" required />}
//                       {formEmail && <input type="text" className="bg-[#E4B16A] text-2xl placeholder-black focus:outline-none opacity-60 block w-full p-2.5" style={{ borderRadius: formFieldsRadius }} placeholder="email" required />}
//                       {formPhone && <input type="text" className="bg-[#E4B16A] text-2xl placeholder-black focus:outline-none opacity-60 block w-full p-2.5" style={{ borderRadius: formFieldsRadius }} placeholder="phone" required />}
//                       <button href='#' className="bg-black text-white px-12 py-2 text-2xl font-bold mt-8 mb-5" style={{ backgroundColor: formBtnColor, color: formBtnTextColor, fontSize: (formButtonTextSize - 10), borderRadius: formBtnRadius, fontSize: formButtonTextSize }}>
//                         {formPrimaryBtnText || "Confirm"}
//                       </button>
//                       {/* <a className='text-2xl font-bold underline' style={{ color: formRejectTextColor, fontSize: formButtonTextSize, fontWeight: formButtonTextWeight }} href='#'>
//                       {formSecondaryBtnText || "No, thanks"}
//                     </a>
//                     <span className='text-white'>{formWarningText || "Suitable for GDPR structure"}</span> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           }
//         </Card>
//       </Grid.Cell>
//       <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
//         <div className='overflow-y-auto h-[calc(100vh-190px)]'>
//           <BlockStack gap="500" align='center'>
//             {formSection && (
//               <>
//                 <Card sectioned>
//                   <BlockStack gap="300" align='center'>
//                     <InlineStack gap="200" align='space-between'>
//                       <Text variant="bodyMd" as="p">
//                         Name
//                       </Text>
//                       <ToggleSwitch checked={formName} onChange={() => setFormName(prevState => !prevState)} round />
//                     </InlineStack>
//                     <InlineStack gap="200" align='space-between'>
//                       <Text variant="bodyMd" as="p">
//                         Email
//                       </Text>
//                       <ToggleSwitch checked={formEmail} onChange={() => setFormEmail(prevState => !prevState)} round />
//                     </InlineStack>
//                     <InlineStack gap="200" align='space-between'>
//                       <Text variant="bodyMd" as="p">
//                         Phone
//                       </Text>
//                       <ToggleSwitch checked={formPhone} onChange={() => setFormPhone(prevState => !prevState)} round />
//                     </InlineStack>
//                     <InlineStack gap="200" align='space-between' blockAlign='center'>
//                       <span>Image</span>
//                       <div className='w-10 h-10'>
//                         <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
//                           {uploadedFile}
//                           {fileUpload}
//                         </DropZone>
//                       </div>
//                     </InlineStack>
//                     {
//                       formFile && (
//                         <Button variant="tertiary" size="large" onClick={() => setFormFile(null)}>Remove Image</Button>
//                       )
//                     }
//                     <TextField
//                       label="Title"
//                       value={formTitle}
//                       onChange={(value) => setFormTitle(value)}
//                       autoComplete="off"
//                     />

//                     <TextField
//                       label="Subtitle"
//                       value={formSubtitle}
//                       onChange={(value) => setFormSubtitle(value)}
//                       autoComplete="off"
//                     />

//                     <TextField
//                       label="Primary Button Text"
//                       value={formPrimaryBtnText}
//                       onChange={(value) => setFormPrimaryBtnText(value)}
//                       autoComplete="off"
//                     />

//                     <TextField
//                       label="Primary Button Link"
//                       value={formPrimaryBtnLink}
//                       onChange={(value) => setFormPrimaryBtnLink(value)}
//                       autoComplete="off"
//                     />

//                     {/* <TextField
//                       label="Discount Code"
//                       value={formDiscountCode}
//                       onChange={(value) => setFormDiscountCode(value)}
//                       // error={isInvalidDiscountCode}
//                       helpText="This field is required"
//                       autoComplete="off"
//                     /> */}
//                     {/* {
//                       isInvalidDiscountCode && (
//                         <InlineError message="This fiedl is required" fieldID={textFieldID} />

//                       )
//                     } */}
//                     {/* <TextField
//                       label="Discount"
//                       type='number'
//                       value={formDiscount}
//                       onChange={(value) => setFormDiscount(value)}
//                       // error={isInvalidDiscount}
//                       autoComplete="off"
//                       helpText="This field is required"
//                     /> */}
//                     {/* {
//                       isInvalidDiscount && (
//                         <InlineError message="This fiedl is required" fieldID={textFieldID} />
//                       )
//                     } */}

//                     {/* <TextField
//                       label="Secondary Button Text"
//                       value={formSecondaryBtnText}
//                       onChange={(value) => setFormSecondaryBtnText(value)}
//                       autoComplete="off"
//                     />

//                     <TextField
//                       label="Secondary Button Link"
//                       value={formSecondaryBtnLink}
//                       onChange={(value) => setFormSecondaryBtnLink(value)}
//                       autoComplete="off"
//                     />

//                     <TextField
//                       label="Warning Text"
//                       value={formWarningText}
//                       onChange={(value) => setFormWarningText(value)}
//                       autoComplete="off"
//                     /> */}
//                     <ColorPicker value={formTitleColor} onChange={color => setFormTitleColor(color)} label="Title" />
//                     <ColorPicker value={formSubtitleColor} onChange={color => setFormSubtitleColor(color)} label="Subtitle" />
//                     <ColorPicker value={formBtnColor} onChange={color => setFormBtnColor(color)} label="Button" />
//                     <ColorPicker value={formBtnTextColor} onChange={color => setFormBtnTextColor(color)} label="Button Text" />
//                     {/* <ColorPicker value={formSecondaryBtnColor} onChange={color => setFormSecondaryBtnColor(color)} label="Secondary Button" /> */}
//                     {/* <ColorPicker value={formSecondaryBtnTextColor} onChange={color => setFormSecondaryBtnTextColor(color)} label="Secondary Button Text" /> */}
//                     <ColorPicker value={formRejectTextColor} onChange={color => setFormRejectTextColor(color)} label="Reject Text" />
//                     <ColorPicker value={formBgColor} onChange={color => setFormBgColor(color)} label="Background" />
//                     <ColorPicker value={formCloseBtnColor} onChange={color => setFormCloseBtnColor(color)} label="Close Button" />
//                     <RangeSlider label="Title Text" value={formTitleSize} max={32} min={16} onChange={value => setFormTitleSize(value)} output />
//                     {/* <RangeSlider output label="Tittle weight" min={100} max={800} step={100} value={formTitleWeight} onChange={value => setFormTitleWeight(value)} /> */}
//                     <RangeSlider label="Subtitle Text " value={formSubtitleSize} max={28} min={16} onChange={value => setFormSubtitleSize(value)} output />
//                     {/* <RangeSlider output label="Subtitle weight" min={100} max={800} step={100} value={formSubtitleWeight} onChange={value => setFormSubtitleWeight(value)} /> */}
//                     <RangeSlider label="Button Text" value={formButtonTextSize} max={32} min={16} onChange={value => setFormButtonTextSize(value)} output />
//                     {/* <RangeSlider output label="Button Text weight" min={100} max={800} step={100} value={formButtonTextWeight} onChange={value => setFormButtonTextWeight(value)} /> */}
//                     <RangeSlider label="Popup Radius" value={formRadius} max={75} min={0} onChange={value => setFormRadius(value)} output />
//                     <RangeSlider label="Button Radius" value={formBtnRadius} max={25} min={0} onChange={value => setFormBtnRadius(value)} output />
//                     <RangeSlider label="Fields Radius" value={formFieldsRadius} max={25} min={0} onChange={value => setFormFieldsRadius(value)} output />
//                   </BlockStack>
//                 </Card>
//               </>
//             )}
//           </BlockStack>
//         </div>
//       </Grid.Cell>

//     </Grid >
//   );
// };

// const SuccessContent = ({
//   successFormTitle,
//   setSuccessFormTitle,
//   successFormButtonText,
//   setSuccessFormButtonText,
//   successFormMiddleText,
//   setSuccessFormMiddleText,
//   successFormBtnLink,
//   setSuccessFormBtnLink,
//   successFormTitleColor,
//   setSuccessFormTitleColor,
//   successFormButtonTextColor,
//   setSuccessFormButtonTextColor,
//   successFormBackgroundColor,
//   setSuccessFormBackgroundColor,
//   successFormMiddleTextColor,
//   setSuccessFormMiddleTextColor,
//   successFormShowBtn,
//   setSuccessFormShowBtn,
//   successFormBtnColor,
//   setSuccessFormBtnColor,
//   successFormCloseBtnColor,
//   setSuccessFormCloseBtnColor,
//   successFormTitleFontSize,
//   setSuccessFormTitleFontSize,
//   successFormButtonFontSize,
//   setSuccessFormButtonFontSize,
//   successFormBtnTextWeight,
//   setSuccessFormBtnTextWeight,
//   successFormTitleWeight,
//   setSuccessFormTitleWeight,
//   successFormRadius,
//   setSuccessFormRadius,

// }) => {

//   const [activeView, setActiveView] = useState('desktop');
//   const handleInputChange = useCallback((setter) => (newValue) => setter(newValue), []);
//   const handleToggleChange = () => setSuccessFormShowBtn((prevChecked) => !prevChecked);
//   const handleColorChange = useCallback((setter) => (newColor) => setter(newColor), []);

//   const handleViewChange = useCallback(
//     (view) => {
//       if (activeView === view) return;
//       setActiveView(view);
//     },
//     [activeView],)

//   return (
//     <Grid columns={{ sm: 3 }}>
//       <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 9, lg: 9, xl: 9 }}>
//         <Card title="Sales">
//           <div className='flex justify-center items-center my-5'>
//             <ButtonGroup variant="segmented">
//               <Button
//                 pressed={activeView === "desktop"}
//                 onClick={() => handleViewChange("desktop")}
//                 icon={DesktopMajor}
//                 size='Slim'

//               >
//               </Button>
//               <Button
//                 pressed={activeView === "mobile"}
//                 onClick={() => handleViewChange("mobile")}
//                 icon={MobileMajor}
//                 size='Slim'
//               >
//               </Button>
//             </ButtonGroup>
//           </div>
//           {
//             activeView === "desktop" ? (
//               <div className='min-h-[550px] flex justify-center bg-[#E2E2E2] rounded-[24px] items-center'>
//                 <div className="relative  p-6 w-[400px] shadow-lg flex justify-center items-center text-center gap-4 flex-col" style={{ backgroundColor: successFormBackgroundColor, borderRadius: successFormRadius }}>
//                   <span className='w-9 h-9 absolute top-2 right-1 flex justify-center items-center cursor-pointer'>
//                     <ImCross className='size-5' style={{ color: successFormCloseBtnColor }} />
//                   </span>
//                   <p className="text-gray-600 text-2xl font-bold mb-12 break-words max-w-[90%]" style={{ color: successFormTitleColor, fontSize: successFormTitleFontSize, fontWeight: successFormTitleWeight }}>{successFormTitle || "You can use the code below on the checkout."}</p>
//                   <span className='px-24  py-1 text-4xl font-bold rounded-xl' style={{ color: successFormMiddleTextColor }}>{successFormMiddleText || "AFW53JND"}</span>
//                   <button className="bg-[#e4b16a] px-3 py-2  text-2xl font-bold mt-16" style={{ color: successFormButtonTextColor, backgroundColor: successFormBtnColor, fontSize: successFormButtonFontSize, fontWeight: successFormBtnTextWeight }}>{successFormButtonText || "Get discount Code"}</button>

//                 </div>
//               </div>
//             ) : (
//               <div className='flex justify-center items-center my-5'>
//                 <div className='min-h-[550px] bg-[#E2E2E2] flex justify-center max-w-[260px] rounded-[24px] items-end '>
//                   <div className=" rounded-b-[24px] p-3  shadow-lg flex justify-center w-[260px] items-center text-center gap-4 flex-col" style={{ backgroundColor: successFormBackgroundColor }}>
//                     {/* <span className='w-9 h-9 absolute top-2 right-1  flex justify-center items-center cursor-pointer text-white rounded-full'>

//                       </span> */}
//                     <div className='flex justify-end w-full'>
//                       <ImCross className=' size-5' style={{ color: successFormCloseBtnColor }} />
//                     </div>

//                     <p className="text-gray-600 text-2xl text-wrap font-bold mb-12 break-words" style={{ color: successFormTitleColor, fontSize: successFormTitleFontSize, fontWeight: successFormTitleWeight }}>{successFormTitle || "You can use the code below on the checkout."}</p>


//                     <span className='px-24  py-1 text-4xl font-bold rounded-xl ' style={{ color: successFormMiddleTextColor }}>{successFormMiddleText || "AFW53JND"}</span>
//                     <button className="bg-[#e4b16a] px-3 py-2  text-2xl font-bold mt-16" style={{ color: successFormButtonTextColor, backgroundColor: successFormBtnColor, fontSize: successFormButtonFontSize, fontWeight: successFormBtnTextWeight }}>{successFormButtonText || "Get discount Code"}</button>

//                   </div>
//                 </div>
//               </div>
//             )
//           }


//         </Card>
//       </Grid.Cell>
//       <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
//         <Card sectioned>
//           <BlockStack gap="300" align='center'>
//             <TextField label="Title" value={successFormTitle} onChange={handleInputChange(setSuccessFormTitle)} autoComplete="off" />
//             <TextField label="Middle Text" value={successFormMiddleText} onChange={handleInputChange(setSuccessFormMiddleText)} autoComplete="off" />
//             <InlineStack gap="200" align='space-between'>
//               <span>Button</span>
//               <ToggleSwitch checked={successFormShowBtn} onChange={handleToggleChange} round />
//             </InlineStack>
//             {successFormShowBtn && (
//               <>
//                 <TextField label="Button Text" value={successFormButtonText} onChange={handleInputChange(setSuccessFormButtonText)} autoComplete="off" />
//                 <TextField label="Button Link" value={successFormBtnLink} onChange={handleInputChange(setSuccessFormBtnLink)} autoComplete="off" />
//               </>
//             )}
//             <ColorPicker value={successFormTitleColor} onChange={handleColorChange(setSuccessFormTitleColor)} label="Title" />
//             <ColorPicker value={successFormBtnColor} onChange={handleColorChange(setSuccessFormBtnColor)} label="Button" />
//             {successFormShowBtn && (
//               <ColorPicker value={successFormButtonTextColor} onChange={handleColorChange(setSuccessFormButtonTextColor)} label="Button Text" />
//             )}
//             <ColorPicker value={successFormBackgroundColor} onChange={handleColorChange(setSuccessFormBackgroundColor)} label="Background" />
//             <ColorPicker value={successFormMiddleTextColor} onChange={handleColorChange(setSuccessFormMiddleTextColor)} label="Middle Text" />
//             <ColorPicker value={successFormCloseBtnColor} onChange={handleColorChange(setSuccessFormCloseBtnColor)} label="Close Button" />
//             <RangeSlider label="Title" value={successFormTitleFontSize} max={32} min={16} onChange={(value) => setSuccessFormTitleFontSize(value)} output />
//             <RangeSlider label="Button" value={successFormButtonFontSize} max={32} min={16} onChange={(value) => setSuccessFormButtonFontSize(value)} output />
//             <RangeSlider label="Title Weight" value={successFormTitleWeight} max={900} min={100} onChange={(value) => setSuccessFormTitleWeight(value)} output />
//             <RangeSlider label="Button Weight" value={successFormBtnTextWeight} max={900} min={100} onChange={(value) => setSuccessFormBtnTextWeight(value)} output />
//             <RangeSlider label="Radius" value={successFormRadius} max={24} min={0} onChange={(value) => setSuccessFormRadius(value)} output />

//           </BlockStack>
//         </Card>
//       </Grid.Cell>
//     </Grid>
//   );
// };

const EditNavigation = () => {

  const { shop, url } = useContext(AppContext);
  // console.log("from information ", shop);
  const appBridge = useAppBridge()
  const params = useParams();
  const navigate = useNavigate();

  // const { show } = useToast();
  const { callApi, loading, error } = useApi(appBridge, url);
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(false);
  const [editResponse, setEditResponse] = useState();
  const toggleActive = useCallback(() => setActive((active) => !active), []);


  /// information state
  const [barName, setBarName] = useState('Bar 1');
  const [isDataInitialized, setIsDataInitialized] = useState(true);
  const [typeIds, setTypeIds] = useState();
  const [arrayIds, setArrayIds] = useState([]);
  const [selectedRadioValue, setSelectedRadioValue] = React.useState("home");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectedCollectionsIDs, setSelectedCollectionsIDs] = useState([]);
  const [selectedProductsIDs, setSelectedProductsIDs] = useState([]);
  const [selectedPagesIDs, setSelectedPagesIDs] = useState([]);
  const [selectedBlogsIDs, setSelectedBlogsIDs] = useState([]);
  const [productsList, setProductsList] = useState();
  const [pagesList, setPagesList] = useState();
  const [collectionsList, setCollectionsList] = useState();
  const [blogsList, setBlogsList] = useState();
  // bar content state
  const [title, setTitle] = useState('');
  const [scroll, setScroll] = useState('');
  const [btnText, setBtnText] = useState('');
  const [btnLink, setBtnLink] = useState('');

  const handleInputChange = useCallback((setter) => (newValue) => setter(newValue), []);

  const [showBtn, setShowBtn] = useState(true);
  const handleToggleChange = () => setShowBtn((prevChecked) => !prevChecked);

  const [titleColor, setTitleColor] = useState('#ffff');
  const [barColor, setBarColor] = useState('#8c52ff');
  const [btnColor, setBtnColor] = useState('#ecaaff');
  const [btnTextColor, setBtnTextColor] = useState('#00000');
  const [closeBtnColor, setCloseBtnColor] = useState('#000000');

  const [activeView, setActiveView] = useState("desktop");

  const handleColorChange = (setter) => (newColor) => setter(newColor);


  const [titleSize, setTitleSize] = useState(18);
  const [titleWeight, setTitleWeight] = useState(500);
  const [buttonTextSize, setButtonTextSize] = useState(16);
  const [buttonTextWeight, setButtonTextWeight] = useState(500);
  const [barFile, setBarFile] = useState('');
  const [btnRadius, setBtnRadius] = useState(6);
  const [mobileViewTitleSize, setMobileViewTitleSize] = useState(12);
  const [mobileViewBtnTextSize, setMobileViewBtnTextSize] = useState(18);
  const handleSliderChange = (sliderSetter) => (value) => {
    sliderSetter(value);
  };
  const handleStepedSliderChange = (sliderSetter) => (value) => {
    sliderSetter(value);
  };
  const handleBarDropZone = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setBarFile(acceptedFiles[0]),
    []
  );

  /// form content
  const [formTitle, setFormTitle] = useState('Would you like to get 20% discount?');
  const [formSubtitle, setFormSubtitle] = useState('Subtitle will be here');
  const [formPrimaryBtnText, setFormPrimaryBtnText] = useState('Confirm');
  const [formPrimaryBtnLink, setFormPrimaryBtnLink] = useState('');
  const [formSecondaryBtnText, setFormSecondaryBtnText] = useState('');
  const [formSecondaryBtnLink, setFormSecondaryBtnLink] = useState('No, thanks');
  const [formWarningText, setFormWarningText] = useState('Suitable for GDPR structure');
  const [] = useState('');
  const [formFile, setFormFile] = useState('');
  const [formDesktopFile, setFormDesktopFile] = useState('');
  const [formMobileFile, setFormMobileFile] = useState('');
  const [formDiscountCode, setFormDiscountCode] = useState('');
  const [formDiscount, setFormDiscount] = useState('');


  const [isInvalidDiscountCode, setIsInvalidDiscountCode] = useState(false);
  const [isInvalidDiscount, setIsInvalidDiscount] = useState(false);

  const [formSection, setFormSection] = useState(true);
  const [formName, setFormName] = useState(false);
  const [formEmail, setFormEmail] = useState(false);
  const [formPhone, setFormPhone] = useState(false);

  const [formTitleColor, setFormTitleColor] = useState('#ffff');
  const [formSubtitleColor, setFormSubtitleColor] = useState('#ffff');
  const [formBtnColor, setFormBtnColor] = useState('#E4B16A');
  const [formBtnTextColor, setFormBtnTextColor] = useState('#010203');
  const [formSecondaryBtnColor, setFormSecondaryBtnColor] = useState('#4494ff');
  const [formSecondaryBtnTextColor, setFormSecondaryBtnTextColor] = useState('#010203');
  const [formRejectTextColor, setFormRejectTextColor] = useState('#ffff');
  const [formBgColor, setFormBgColor] = useState('#B86D5F');
  const [formCloseBtnColor, setFormCloseBtnColor] = useState('#00000');

  const [formTitleSize, setFormTitleSize] = useState(23);
  const [formTitleWeight, setFormTitleWeight] = useState(500);
  const [formSubtitleSize, setFormSubtitleSize] = useState(16);
  const [formSubtitleWeight, setFormSubtitleWeight] = useState(500);
  const [formButtonTextSize, setFormButtonTextSize] = useState(22);
  const [formButtonTextWeight, setFormButtonTextWeight] = useState(500);
  const [formRadius, setFormRadius] = useState(26);
  const [formBtnRadius, setFormBtnRadius] = useState(11);
  const [formFieldsRadius, setFormFieldsRadius] = useState(10);
  const [formFieldsColor, setFormFieldsColor] = useState('#F1F1F1');
  const [formMobileViewTitleSize, setFormMobileViewTitleSize] = useState(20);
  const [formMobileViewButtonTextSize, setFormMobileViewButtonTextSize] = useState(16);
  const [formMobileViewSubtitleSize, setFormMobileViewSubtitleSize] = useState(12);

  const handleFormSliderChange = (sliderSetter) => (value) => {
    sliderSetter(value);
  };
  const handleFormStepedSliderChange = (sliderSetter) => (value) => {
    sliderSetter(value);
  };

  const handleFormInputChange = useCallback((setter) => (newValue) => setter(newValue), []);
  const handleFormToggleChange = (stateSetter) => () => {
    stateSetter((prevState) => !prevState);
  };

  const handleFormColorChange = (colorSetter) => (newColor) => {
    colorSetter(newColor);
  };

  const handleFormDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setFormDesktopFile(acceptedFiles[0]),
    []
  );
  const handleDropZoneDropMobile = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setFormMobileFile(acceptedFiles[0]),
    []
  );


  // const [formSec, setFormSec] = useState(true);

  // const handleFormSectionChange = useCallback((newFormSection) => {
  //   setFormSec(newFormSection);
  // }, []);

  // Define tabs based on the value of formSec
  // const tabs = !formSec
  //   ? [
  //     { id: 'home', content: 'Information', accessibilityLabel: 'All customers', panelID: 'home-customers-content-4', render: <InformationContent /> },
  //     { id: 'Bar', content: 'Bar', panelID: 'products-content-4', render: <BarContent /> },
  //     { id: 'Form', content: 'Form', panelID: 'brands-content-4', render: <FormContent onFormSectionChange={handleFormSectionChange} /> },
  //   ]
  //   : [
  //     { id: 'home', content: 'Information', accessibilityLabel: 'All customers', panelID: 'home-customers-content-4', render: <InformationContent /> },
  //     { id: 'Bar', content: 'Bar', panelID: 'products-content-4', render: <BarContent /> },
  //     { id: 'Form', content: 'Form', panelID: 'brands-content-4', render: <FormContent onFormSectionChange={handleFormSectionChange} /> },
  //     { id: 'Success', content: 'Success', panelID: 'model-content-4', render: <SuccessContent /> },
  //   ];


  //sucess conetnt

  const [successFormTitle, setSuccessFormTitle] = useState('We thank you.');
  const [successFormButtonText, setSuccessFormButtonText] = useState('Continue');
  const [successFormMiddleText, setSuccessFormMiddleText] = useState('The eBook has been sent to your email address, please check your email box.');
  const [successFormBtnLink, setSuccessFormBtnLink] = useState('');
  const [successFormTitleColor, setSuccessFormTitleColor] = useState('#ffff');
  const [successFormButtonTextColor, setSuccessFormButtonTextColor] = useState('#00000');
  const [successFormBackgroundColor, setSuccessFormBackgroundColor] = useState('#333333');
  const [successFormMiddleTextColor, setSuccessFormMiddleTextColor] = useState('#ffff');
  const [successFormShowBtn, setSuccessFormShowBtn] = useState(true);
  const [successFormBtnColor, setSuccessFormBtnColor] = useState('#F1F1F1');
  const [successFormCloseBtnColor, setSuccessFormCloseBtnColor] = useState('#F1F1F1');
  const [successFormTitleFontSize, setSuccessFormTitleFontSize] = useState(27);
  const [successFormButtonFontSize, setSuccessFormButtonFontSize] = useState(24);
  const [successFormBtnTextWeight, setSuccessFormBtnTextWeight] = useState(500);
  const [successFormTitleWeight, setSuccessFormTitleWeight] = useState(500);
  const [successFormRadius, setSuccessFormRadius] = useState(22);
  const [successFormBtnRadius, setSuccessFormBtnRadius] = useState(8);
  const [successFormMiddleTextSize, setSuccessFormMiddleTextSize] = useState(16);
  const [successFormMobileViewTitleSize, setSuccessFormMobileViewTitleSize] = useState(30);
  const [successFormMobileViewButtonSize, setSuccessFormMobileViewButtonSize] = useState(18);
  const [successFormMobileViewMiddleTextSize, setSuccessFormMobileViewMiddleTextSize] = useState(18);
  const [discountStatus, setDiscountStatus] = useState(false);
  const [discountCode, setDiscountCode] = useState('');


  const [barInfo, setBarInfo] = useState();
  const handleChildData = useCallback((data) => {
    // console.log("data is ==== ", data)
    setBarInfo(data)
  }, [])

  const tabs = [
    {
      id: 'home', content: 'Information', accessibilityLabel: 'All customers', panelID: 'home-customers-content-4', render:
        <Information
          barName={barName}
          setBarName={setBarName}
          typeIds={typeIds}
          setTypeIds={setTypeIds}
          selectedRadioValue={selectedRadioValue}
          setSelectedRadioValue={setSelectedRadioValue}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
          selectedBlogs={selectedBlogs}
          setSelectedBlogs={setSelectedBlogs}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          selectedProductsIDs={selectedProductsIDs}
          setSelectedProductsIDs={setSelectedProductsIDs}
          selectedPagesIDs={selectedPagesIDs}
          setSelectedPagesIDs={setSelectedPagesIDs}
          selectedBlogsIDs={selectedBlogsIDs}
          setSelectedBlogsIDs={setSelectedBlogsIDs}
          selectedCollectionsIDs={selectedCollectionsIDs}
          setSelectedCollectionsIDs={setSelectedCollectionsIDs}
          arrayIds={arrayIds}
          setArrayIds={setArrayIds}
          isDataInitialized={isDataInitialized}
          setIsDataInitialized={setIsDataInitialized}
        />
    },
    {
      id: 'Bar', content: 'Bar', panelID: 'products-content-4', render:
        <BarContent
          title={title}
          scroll={scroll}
          btnText={btnText}
          btnLink={btnLink}
          showBtn={showBtn}
          titleColor={titleColor}
          barColor={barColor}
          btnColor={btnColor}
          btnTextColor={btnTextColor}
          closeBtnColor={closeBtnColor}
          titleSize={titleSize}
          titleWeight={titleWeight}
          buttonTextSize={buttonTextSize}
          buttonTextWeight={buttonTextWeight}
          activeView={activeView}
          handleColorChange={handleColorChange}
          handleSliderChange={handleSliderChange}
          handleStepedSliderChange={handleStepedSliderChange}
          handleInputChange={handleInputChange}
          handleToggleChange={handleToggleChange}
          setTitleColor={setTitleColor}
          setBarColor={setBarColor}
          setBtnColor={setBtnColor}
          setBtnTextColor={setBtnTextColor}
          setCloseBtnColor={setCloseBtnColor}
          setTitleSize={setTitleSize}
          setTitleWeight={setTitleWeight}
          setButtonTextSize={setButtonTextSize}
          setButtonTextWeight={setButtonTextWeight}
          setActiveView={setActiveView}
          setTitle={setTitle}
          setScroll={setScroll}
          setBtnText={setBtnText}
          setBtnLink={setBtnLink}
          setShowBtn={setShowBtn}
          barFile={barFile}
          setBarFile={setBarFile}
          handleBarDropZone={handleBarDropZone}
          btnRadius={btnRadius}
          setBtnRadius={setBtnRadius}
          mobileViewTitleSize={mobileViewTitleSize}
          setMobileViewTitleSize={setMobileViewTitleSize}
          mobileViewBtnTextSize={mobileViewBtnTextSize}
          setMobileViewBtnTextSize={setMobileViewBtnTextSize}
        />
    },
    {
      id: 'Form', content: 'Form', panelID: 'brands-content-4', render:
        <FormContent
          // onFormSectionChange={handleFormSectionChange}
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          formSubtitle={formSubtitle}
          setFormSubtitle={setFormSubtitle}
          formPrimaryBtnText={formPrimaryBtnText}
          setFormPrimaryBtnText={setFormPrimaryBtnText}
          formPrimaryBtnLink={formPrimaryBtnLink}
          setFormPrimaryBtnLink={setFormPrimaryBtnLink}
          formSecondaryBtnText={formSecondaryBtnText}
          setFormSecondaryBtnText={setFormSecondaryBtnText}
          formSecondaryBtnLink={formSecondaryBtnLink}
          setFormSecondaryBtnLink={setFormSecondaryBtnLink}
          formWarningText={formWarningText}
          setFormWarningText={setFormWarningText}
          formFile={formFile}
          setFormFile={setFormFile}
          formDesktopFile={formDesktopFile}
          setFormDesktopFile={setFormDesktopFile}
          formMobileFile={formMobileFile}
          setFormMobileFile={setFormMobileFile}
          formSection={formSection}
          setFormSection={setFormSection}
          formName={formName}
          setFormName={setFormName}
          formEmail={formEmail}
          setFormEmail={setFormEmail}
          formPhone={formPhone}
          setFormPhone={setFormPhone}
          formTitleColor={formTitleColor}
          setFormTitleColor={setFormTitleColor}
          formSubtitleColor={formSubtitleColor}
          setFormSubtitleColor={setFormSubtitleColor}
          formBtnColor={formBtnColor}
          setFormBtnColor={setFormBtnColor}
          formBtnTextColor={formBtnTextColor}
          setFormBtnTextColor={setFormBtnTextColor}
          formRejectTextColor={formRejectTextColor}
          setFormRejectTextColor={setFormRejectTextColor}
          formBgColor={formBgColor}
          setFormBgColor={setFormBgColor}
          formCloseBtnColor={formCloseBtnColor}
          setFormCloseBtnColor={setFormCloseBtnColor}
          formTitleSize={formTitleSize}
          setFormTitleSize={setFormTitleSize}
          formTitleWeight={formTitleWeight}
          setFormTitleWeight={setFormTitleWeight}
          formSubtitleSize={formSubtitleSize}
          setFormSubtitleSize={setFormSubtitleSize}
          formSubtitleWeight={formSubtitleWeight}
          setFormSubtitleWeight={setFormSubtitleWeight}
          formButtonTextSize={formButtonTextSize}
          setFormButtonTextSize={setFormButtonTextSize}
          formButtonTextWeight={formButtonTextWeight}
          setFormButtonTextWeight={setFormButtonTextWeight}
          formDiscountCode={formDiscountCode}
          setFormDiscountCode={setFormDiscountCode}
          formDiscount={formDiscount}
          setFormDiscount={setFormDiscount}
          // handleFormSectionChange={handleFormSectionChange}
          handleFormInputChange={handleFormInputChange}
          handleFormToggleChange={handleFormToggleChange}
          handleFormColorChange={handleFormColorChange}
          handleDropZoneDrop={handleFormDropZoneDrop}
          setFormSecondaryBtnTextColor={setFormSecondaryBtnTextColor}
          setFormSecondaryBtnColor={setFormSecondaryBtnColor}
          formSecondaryBtnTextColor={formSecondaryBtnTextColor}
          formSecondaryBtnColor={formSecondaryBtnColor}
          isInvalidDiscount={isInvalidDiscount}
          isInvalidDiscountCode={isInvalidDiscountCode}
          formRadius={formRadius}
          setFormRadius={setFormRadius}
          formBtnRadius={formBtnRadius}
          setFormBtnRadius={setFormBtnRadius}
          formFieldsRadius={formFieldsRadius}
          setFormFieldsRadius={setFormFieldsRadius}
          formFieldsColor={formFieldsColor}
          setFormFieldsColor={setFormFieldsColor}
          formMobileViewButtonTextSize={formMobileViewButtonTextSize}
          setFormMobileViewButtonTextSize={setFormMobileViewButtonTextSize}
          formMobileViewTitleSize={formMobileViewTitleSize}
          setFormMobileViewTitleSize={setFormMobileViewTitleSize}
          formMobileViewSubtitleSize={formMobileViewSubtitleSize}
          setFormMobileViewSubtitleSize={setFormMobileViewSubtitleSize}
          handleDropZoneDropMobile={handleDropZoneDropMobile}

        />

    },
    {
      id: 'Success', content: 'Success', panelID: 'model-content-4', render:
        <SuccessForm
          successFormTitle={successFormTitle}
          setSuccessFormTitle={setSuccessFormTitle}
          successFormButtonText={successFormButtonText}
          setSuccessFormButtonText={setSuccessFormButtonText}
          successFormMiddleText={successFormMiddleText}
          setSuccessFormMiddleText={setSuccessFormMiddleText}
          successFormBtnLink={successFormBtnLink}
          setSuccessFormBtnLink={setSuccessFormBtnLink}
          successFormTitleColor={successFormTitleColor}
          setSuccessFormTitleColor={setSuccessFormTitleColor}
          successFormButtonTextColor={successFormButtonTextColor}
          setSuccessFormButtonTextColor={setSuccessFormButtonTextColor}
          successFormBackgroundColor={successFormBackgroundColor}
          setSuccessFormBackgroundColor={setSuccessFormBackgroundColor}
          successFormMiddleTextColor={successFormMiddleTextColor}
          setSuccessFormMiddleTextColor={setSuccessFormMiddleTextColor}
          successFormShowBtn={successFormShowBtn}
          setSuccessFormShowBtn={setSuccessFormShowBtn}
          successFormBtnColor={successFormBtnColor}
          setSuccessFormBtnColor={setSuccessFormBtnColor}
          successFormCloseBtnColor={successFormCloseBtnColor}
          setSuccessFormCloseBtnColor={setSuccessFormCloseBtnColor}
          successFormTitleFontSize={successFormTitleFontSize}
          setSuccessFormTitleFontSize={setSuccessFormTitleFontSize}
          successFormButtonFontSize={successFormButtonFontSize}
          setSuccessFormButtonFontSize={setSuccessFormButtonFontSize}
          successFormBtnTextWeight={successFormBtnTextWeight}
          setSuccessFormBtnTextWeight={setSuccessFormBtnTextWeight}
          successFormTitleWeight={successFormTitleWeight}
          setSuccessFormTitleWeight={setSuccessFormTitleWeight}
          successFormRadius={successFormRadius}
          setSuccessFormRadius={setSuccessFormRadius}
          successFormBtnRadius={successFormBtnRadius}
          setSuccessFormBtnRadius={setSuccessFormBtnRadius}
          successFormMiddleTextSize={successFormMiddleTextSize}
          setSuccessFormMiddleTextSize={setSuccessFormMiddleTextSize}
          successFormMobileViewTitleSize={successFormMobileViewTitleSize}
          setSuccessFormMobileViewTitleSize={setSuccessFormMobileViewTitleSize}
          successFormMobileViewButtonSize={successFormMobileViewButtonSize}
          setSuccessFormMobileViewButtonSize={setSuccessFormMobileViewButtonSize}
          successFormMobileViewMiddleTextSize={successFormMobileViewMiddleTextSize}
          setSuccessFormMobileViewMiddleTextSize={setSuccessFormMobileViewMiddleTextSize}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          discountStatus={discountStatus}
          setDiscountStatus={setDiscountStatus}

        />
    },
  ]
  const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);

  const handleNextButtonClick = useCallback(() => {
    const nextTab = selected + 1;
    if (nextTab < tabs.length) {
      setSelected(nextTab);
    }
    else if (nextTab === tabs.length) {
      handleUpdateBar();
    }
  }, [selected, tabs]);

  const isLastTab = selected === tabs.length - 1;
  const buttonText = isLastTab ? 'Update' : 'Next';


  const handleUpdateBar = async () => {
    const data = {
      bar_name: barName,
      type: selectedRadioValue,
      type_ids: typeIds.toString(),
      bar_title: title,
      bar_image: barFile,
      bar_title_color: titleColor,
      bar_color: barColor,
      bar_scroll: scroll,
      bar_button_enabled: showBtn ? "1" : "0",
      bar_button_text: btnText,
      bar_button_color: btnColor,
      bar_button_text_color: btnTextColor,
      bar_close_button_color: closeBtnColor,
      bar_title_text_size: titleSize,
      mobile_bar_title_text_size: mobileViewTitleSize,
      mobile_bar_button_text_size: mobileViewBtnTextSize,
      // bar_title_text_weight: titleWeight,
      bar_button_text_size: buttonTextSize,
      // bar_button_text_weight: buttonTextWeight,
      bar_button_radius: btnRadius,
      form_name_enabled: formName ? "1" : "0",
      form_email_enabled: formPhone ? "1" : "0",
      form_phone_enabled: formEmail ? "1" : "0",
      form_image: formDesktopFile,
      mobile_form_image: formMobileFile,
      discount_code: formDiscountCode,
      discount: formDiscount,
      form_title: formTitle,
      form_sub_title: formSubtitle,
      form_primary_button_text: formPrimaryBtnText,
      form_primary_button_link: formPrimaryBtnLink,
      form_secondary_button_text: formSecondaryBtnText,
      // form_secondary_button_link: formSecondaryBtnLink,
      form_warning_text: formWarningText,
      form_title_color: formTitleColor,
      form_sub_title_color: formSubtitleColor,
      form_primary_button_color: formBtnColor,
      form_primary_button_text_color: formBtnTextColor,
      // form_secondary_button_color: "#6C063C",
      // form_secondary_button_text_color: "#6C063C",
      form_fields_color: formFieldsColor,
      form_background_color: formBgColor,
      form_close_button_color: formCloseBtnColor,
      form_title_size: formTitleSize,
      mobile_form_title_size: formMobileViewTitleSize,
      // form_title_weight: formTitleWeight,
      form_sub_title_size: formSubtitleSize,
      mobile_form_sub_title_size: formMobileViewSubtitleSize,
      // form_sub_title_weight: formSubtitleWeight,
      form_button_text_size: formButtonTextSize,
      mobile_button_text_size: formMobileViewButtonTextSize,
      // form_button_text_weight: formButtonTextWeight,
      form_button_pop_up_radius: formRadius,
      form_button_fields_radius: formFieldsRadius,
      form_button_button_radius: formBtnRadius,
      success_form_title: successFormTitle,
      success_form_middle_title: successFormMiddleText,
      success_form_button_enabled: successFormShowBtn ? "1" : "0",
      success_form_button_text: successFormButtonText,
      success_form_button_link: successFormBtnLink,
      success_form_title_color: successFormTitleColor,
      success_form_button_text_color: successFormButtonTextColor,
      success_form_button_color: successFormBtnColor,
      success_form_background_color: successFormBackgroundColor,
      success_form_middle_title_color: successFormMiddleTextColor,
      success_form_close_button_color: successFormCloseBtnColor,
      success_form_popup_radius: successFormRadius,
      success_form_button_radius: successFormBtnRadius,
      success_form_title_size: successFormTitleFontSize,
      mobile_success_form_title_size: successFormMobileViewTitleSize,
      success_form_middle_text_size: successFormMiddleTextSize,
      mobile_success_form_middle_text_size: successFormMobileViewMiddleTextSize,
      success_form_button_size: successFormButtonFontSize,
      mobile_success_form_button_size: successFormMobileViewButtonSize,
      // discount_code: discountCode,
      // discount_status: discountStatus ? "1" : "0",
      id: params.id,
    }

    const responce = await callApi(`update-data`, "POST", data);
    // console.log(responce)
    navigate('/');
  }

  const SetAllStates = (data) => {
    // console.log("data is == ", data)
    setBarName(data?.bar_name);
    setTypeIds(data?.type_ids);
    setTitle(data?.bar_title);
    setTitleColor(data?.bar_title_color);
    setBarColor(data?.bar_color);
    setScroll(data?.bar_scroll);
    setBarFile(data?.bar_image);
    // setShowBtn(data?.bar_button_enabled === 1);
    setBtnText(data?.bar_button_text);
    setBtnColor(data?.bar_button_color);
    setBtnTextColor(data?.bar_button_text_color);
    setCloseBtnColor(data?.bar_close_button_color);
    setTitleSize(data?.bar_title_text_size);
    setMobileViewTitleSize(data?.mobile_bar_title_text_size);
    // setTitleWeight(data?.bar_title_text_weight);
    setButtonTextSize(data?.bar_button_text_size);
    setMobileViewBtnTextSize(data?.mobile_bar_button_text_size);
    // setButtonTextWeight(data?.bar_button_text_weight);

    setFormName((data?.bar_form.form_name_enabled) == "1");
    setFormPhone((data?.bar_form.form_phone_enabled) == "1");
    setFormEmail((data?.bar_form.form_email_enabled) == "1");
    setFormDiscountCode(data?.discount_code);
    setFormDiscount(data?.discount);
    // setFormFile(data?.bar_form.form_image);
    setFormMobileFile(data?.bar_form.mobile_form_image);
    setFormDesktopFile(data?.bar_form.form_image);
    setFormTitle(data?.bar_form.form_title);
    setFormSubtitle(data?.bar_form.form_sub_title);
    setFormPrimaryBtnText(data?.bar_form.form_primary_button_text);
    setFormPrimaryBtnLink(data?.bar_form.form_primary_button_link);
    setFormSecondaryBtnText(data?.bar_form.form_secondary_button_text);
    setFormSecondaryBtnLink(data?.bar_form.form_secondary_button_link);
    setFormWarningText(data?.bar_form.form_warning_text);
    setFormTitleColor(data?.bar_form.form_title_color);
    setFormFieldsColor(data?.bar_form.form_fields_color);
    setFormSubtitleColor(data?.bar_form.form_sub_title_color);
    setFormBtnColor(data?.bar_form.form_primary_button_color);
    setFormBtnTextColor(data?.bar_form.form_primary_button_text_color);
    setFormBgColor(data?.bar_form.form_background_color);
    setFormCloseBtnColor(data?.bar_form.form_close_button_color);
    setFormTitleSize(data?.bar_form.form_title_size);
    setFormMobileViewTitleSize(data?.bar_form.mobile_form_title_size);
    // setFormTitleWeight(data?.bar_form.form_title_weight);
    setFormSubtitleSize(data?.bar_form.form_sub_title_size);
    setFormMobileViewSubtitleSize(data?.bar_form.mobile_form_sub_title_size);
    // setFormSubtitleWeight(data?.bar_form.form_sub_title_weight);
    setFormButtonTextSize(data?.bar_form.form_button_text_size);
    setFormMobileViewButtonTextSize(data?.bar_form.mobile_button_text_size);
    // setFormButtonTextWeight(data?.bar_form.form_button_text_weight);

    setSuccessFormTitle(data?.bar_success_form.success_form_title);
    setSuccessFormMobileViewTitleSize(data?.bar_success_form.mobile_success_form_title_size);
    setSuccessFormMiddleText(data?.bar_success_form.success_form_middle_title);
    setSuccessFormMiddleTextSize(data?.bar_success_form.mobile_success_form_middle_text_size)
    setSuccessFormShowBtn(data?.bar_success_form.success_form_button_enabled === 1);
    setSuccessFormButtonText(data?.bar_success_form.success_form_button_text);
    setSuccessFormMobileViewButtonSize(data?.bar_success_form.mobile_success_form_button_size);
    setSuccessFormBtnColor(data?.bar_success_form.success_form_button_color);
    setSuccessFormCloseBtnColor(data?.bar_success_form.success_form_close_button_color);
    setSuccessFormBtnLink(data?.bar_success_form.success_form_button_link);
    setSuccessFormTitleColor(data?.bar_success_form.success_form_title_color);
    setSuccessFormButtonTextColor(data?.bar_success_form.success_form_button_text_color);
    setSuccessFormBackgroundColor(data?.bar_success_form.success_form_background_color);
    setSuccessFormMiddleTextColor(data?.bar_success_form.success_form_middle_title_color);
    setSuccessFormRadius(data?.bar_success_form.success_form_popup_radius);
    setSuccessFormBtnRadius(data?.bar_success_form.success_form_button_radius);
    setSelectedRadioValue(data?.type);
    // setDiscountStatus(data?.discount_code_status == "1" ? true : false) 
    // setDiscountCode(data?.discount_code)

    const arrIds = data?.type_ids?.split(",").map(Number)
    setArrayIds(arrIds)
    // console.log("array ids  == ", arrIds)
    if (data?.type == "products") {
      setSelectedProductsIDs(arrIds);
      // console.log("selected products ids === ", selectedProductsIDs)
    } else if (data?.type == "collections") {
      setSelectedCollectionsIDs(arrIds);
      // console.log("selected collections ids === ", selectedCollectionsIDs)
    } else if (data?.type == "pages") {
      setSelectedPagesIDs(arrIds);
      // console.log("selected pages ids === ", selectedPagesIDs)

    } else if (data?.type == "blogs") {
      setSelectedBlogsIDs(arrIds);
      // console.log("selected blogs ids === ", selectedBlogsIDs)
    }

    // getProducts(arrayIds);

    // console.log("form image == ", data?.bar_form.form_image)
  }

  // useEffect(() => {
  //     console.log("selecedt blog ids in effect == ", selectedBlogsIDs)
  // }, [selectedBlogsIDs])


  // const handleChangeTypeIds = () => {
  //     if (selectedRadioValue == "products") {
  //         const selectedProducts = apiResponse?.filter((item) => selectedProductsIDs.includes(item.id));
  //         console.log("selectedProducts sdsdsdsd", selectedProducts, selectedProductsIDs);
  //         setSelectedProducts(selectedProducts);
  //     } else if (selectedRadioValue == "pages") {
  //         const pages = apiResponse?.filter((item) => selectedPagesIDs.includes(item.id));
  //         setSelectedPages(pages);
  //     } else if (selectedRadioValue == "collections") {
  //         const collections = apiResponse?.filter((item) => selectedCollectionsIDs.includes(item.id));
  //         console.log("collections", collections, apiResponse);
  //         setSelectedCollections(collections);
  //     } else if (selectedRadioValue == "blogs") {
  //         const blogs = apiResponse?.filter((item) => selectedBlogsIDs.includes(item.id));
  //         console.log("blogs", blogs, apiResponse, selectedBlogsIDs);
  //         setSelectedBlogs(blogs);
  //     }
  // }


  const handlePageBarView = async () => {
    const responce = await callApi(`page-bar-view?id=${params.id}`, "GET");
    // console.log(responce)
    setEditResponse(responce?.data);
    SetAllStates(responce?.data[0]);
  }

  useEffect(() => {
    handlePageBarView();
  }, [])

  return (
    <>
      {
        loading ?
          <>
            <SkeltonPageWithTabs />
          </>
          : (
            <Page title="Edit Page Bar" primaryAction={<Button variant="primary" onClick={handleNextButtonClick}>{buttonText}</Button>} secondaryActions={<Button>Save Draft</Button>}
              backAction={{ content: 'Add Page Bar', url: '', onAction: () => navigate('/') }}
              fullWidth>
              <Layout>
                <Layout.Section>
                  <div className='Navigation'>
                    <Card padding={'0'}>
                      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted />
                    </Card>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    {tabs[selected].render}
                  </div>
                </Layout.Section>
              </Layout>
            </Page>
          )
      }
    </>

  );
};


export default EditNavigation;
