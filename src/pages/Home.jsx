import { React, useEffect } from 'react';
import { useState, useCallback } from 'react';
import nofndimg from '../pages/datanotfound.png';
import {
  Page,
  Grid,
  Card,
  TextField,
  Select,
  ResourceList,
  Filters,
  Avatar,
  Stack,
  Badge,
  Modal,
  TextContainer,
  Button,
  Heading,
  ResourceItem,
} from '@shopify/polaris';

function Home() {
  // Modal data state
  const [active, setActive] = useState(false);
  const [desableValue, setDesable] = useState(false);
  // input field state
  const [textFieldValue, setTextFieldValue] = useState('');
  const [notFound, setNotFound] = useState();

  const handleClearButtonClick = useCallback(() => {
    setTextFieldValue('')
  }, []);

  const handleTextFieldChange = useCallback(
    (value) => {
      setTextFieldValue(value);
    }, []);
  // Select Option State
  const [selected1, setSelected1] = useState('Select');
  const [selected2, setSelected2] = useState('Select');
  const handleSelectChange1 = useCallback((value) => {
    setSelected2('select');
    setNotFound('');
    setSelected1(value)
  }, []);
  const handleSelectChange2 = useCallback((value) => setSelected2(value), []);
  // Select Options Values Asigns
  const condOpt1 = [
    { label: 'Select', value: 'select' },
    { label: 'User Name', value: 'username' },
    { label: 'Id', value: 'id' },
    { label: 'Followers', value: 'followers' },
  ];
  const condOpt2 = [
    { label: 'Select', value: 'select' },
    { label: 'Contains', value: 'contains' },
    { label: 'Does! Not Contains', value: 'doesnotcontains' },
    { label: 'Equals To', value: 'equalsto' },
    { label: 'Not Equals To', value: 'notequalsto' },
  ];

  // Codition Logic 
  const [rowdata, setRowData] = useState([]);
  const allGitData = [];

  const [modalData, setModalData] = useState({});

  useEffect(() => {
    // Setrowdata blank if validated with Select
    if (selected1 === 'select' && selected2 === 'select') {
      setDesable(false);
      setRowData({});
    }
    if (selected1 === 'select' && selected2 === 'contains') {
      setDesable(false);
      setRowData({});
    }
    if (selected1 === 'select' && selected2 === 'doesnotcontains') {
      setDesable(false);
      setRowData({});
    }
    if (selected1 === 'select' && selected2 === 'equalsto') {
      setDesable(false);
      setRowData({});
    }
    if (selected1 === 'select' && selected2 === 'notequalsto') {
      setDesable(false);
      setRowData({});
    }
    if (selected1 === 'username' && selected2 === 'select') {
      setDesable(false);
      setRowData({});
    }

    if (selected1 === 'id' && selected2 === 'select') {
      setDesable(false);
      setRowData({});
    }
    if (textFieldValue === '' && selected1 === 'followers' && selected2 === 'equalsto') {
      setDesable(false);
      setRowData({});
    }
    // Username with Contains | DNContains | Equals To | Not Equals To
    if (selected1 === 'username' && selected2 === 'contains') {
      usrNameContains();
      setDesable(false);
    }
    if (selected1 === 'username' && selected2 === 'doesnotcontains') {
      usrNameDNCon();
      setDesable(false);
    }
    if (selected1 === 'username' && selected2 === 'equalsto') {
      usrNameEqlTo();
      setDesable(false);
      if (textFieldValue === '' && selected1 === 'username' && selected2 === 'equalsto') {
        setRowData({});
      }
    }
    if (selected1 === 'username' && selected2 === 'notequalsto') {
      usrNameNotEqlTo();
      setDesable(false);
    }

    // Id with Contains | DNContains | Equals To | Not Equals To
    if (selected1 === 'id' && selected2 === 'contains') {
      idContains();
      setDesable(false);
    }
    if (selected1 === 'id' && selected2 === 'doesnotcontains') {
      idDNCon();
      setDesable(false);
    }
    if (selected1 === 'id' && selected2 === 'equalsto') {
      idEqlTo();
      setDesable(false);
    }
    if (selected1 === 'id' && selected2 === 'notequalsto') {
      idNotEqlTo();
      setDesable(false);
    }

    // Followers with only Equals To 
    if (selected1 === 'followers') {
      setSelected2('equalsto');
      setDesable(true);
      if (selected1 === 'followers' && selected2 === 'equalsto') {
        followerEqlTo();
      }
    }
  }, [textFieldValue, selected1, selected2,]);

  // Username With Contains Data 
  async function usrNameContains() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      if (textFieldValue && user.login.startsWith(textFieldValue)) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }
  // Username With Does Not Contains Data
  async function usrNameDNCon() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      if (!user.login.startsWith(textFieldValue)) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }
  // Username With Equals to
  async function usrNameEqlTo() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      const usrLogin = user.login.toString();
      if (textFieldValue && usrLogin === textFieldValue) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }
  // Usernam with Notequals to
  async function usrNameNotEqlTo() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      if (!user.login.startsWith(textFieldValue)) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }


  // Id With Contains Data 
  async function idContains() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      if (textFieldValue && user.id.toString().startsWith(textFieldValue)) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }
  // Id With Does Not Contains Data
  async function idDNCon() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      const usrID = user.id.toString();
      if (!usrID.startsWith(textFieldValue)) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }
  // Id With Equals to
  async function idEqlTo() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      const usrID = user.id.toString();
      if (usrID === textFieldValue) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }
  // Id with Notequals to
  async function idNotEqlTo() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      const usrID = user.id.toString();
      if (!usrID.startsWith(textFieldValue)) {
        tmp.push({
          id: user.id,
          name: user.login,
          userPic: user.avatar_url,
          userUrl: user.html_url,
          userType: user.type,
        });
      }
      if (tmp.includes(...tmp)) {
        setNotFound('');
      } else {
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
    allGitData.push(allgitUser)
    setRowData(tmp);
  }

  //Followers With Equals To Filter
  async function followerEqlTo() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allgitUser = await gitUser.json();
    allgitUser.forEach(user => {
      if (textFieldValue === user.login) {
        fetchFollowers();
        async function fetchFollowers() {
          const gitFollowers = await fetch(`https://api.github.com/users/${user.login}/followers`);
          const allgitFollowers = await gitFollowers.json();
          allgitFollowers.forEach(followers => {
            tmp.push({
              id: followers.id,
              name: followers.login,
              userPic: followers.avatar_url,
              userUrl: followers.html_url,
              userType: followers.type,
            });
          }
          );
          allGitData.push(allgitFollowers)
          setRowData(tmp);
          setNotFound('');
        }
      } else {
        setRowData({});
        setNotFound(<img src={nofndimg} alt="Not Found media" />);
      }
    });
  }

  //Shopify Madal Data Handler
  function handleChange2(active, id, name, userPic, userUrl, userType) {
    //let temp = { ...modalData };    
    let temp = {
      id, name, userPic, userUrl, userType
    }
    setModalData(temp);
    setActive(!active)
  }


  // function test() {
  //   console.log("modalData", modalData)
  //   return <p>{modalData.id}</p>
  // }

  return (
    <>
      <Page>
        <Card sectioned>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 8, xl: 6 }}>
              <TextField
                label={"By " + selected1 + " or " + selected2}
                value={textFieldValue}
                onChange={handleTextFieldChange}
                clearButton
                onClearButtonClick={handleClearButtonClick}
                autoComplete="off"
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 2, xl: 6 }}>
              <Select
                label="Filter"
                options={condOpt1}
                onChange={handleSelectChange1}
                value={selected1}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 2, xl: 6 }}>
              <Select
                label="Filter"
                options={condOpt2}
                onChange={handleSelectChange2}
                value={selected2}
                disabled={desableValue}
              />
            </Grid.Cell>
          </Grid>
          {/* Table */}
          <ResourceList
            items={rowdata}
            renderItem={(item) => {
              const { id, name, userPic, userUrl, userType } = item;
              const media = <Avatar customer size="medium" source={userPic} name={name} />;
              return (
                <ResourceList.Item
                  // url={userUrl}
                  onClick={() => {
                    handleChange2(active, id, name, userPic, userUrl, userType)
                  }}
                  name={name}
                  id={id}
                  //user={userPic}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <Stack distribution='fillEvenly' spacing='loose'>
                    <Stack.Item>
                      <Badge>{id}</Badge>
                    </Stack.Item>
                    <Stack.Item>
                      <Badge>{userType}</Badge>
                    </Stack.Item>
                    <Stack.Item fill>
                      <Heading>{name}</Heading>
                    </Stack.Item>
                    <Stack.Item>
                      <Button size="slim" >View Profile</Button>
                    </Stack.Item>
                  </Stack>
                  <div style={{ height: '50px' }}>
                    <Modal
                      activator={Filters}
                      open={active}
                      onClose={() => { setActive(false) }}
                      title="Received user via github."
                    >
                      <Modal.Section>
                        <TextContainer>
                          <Grid>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 6 }}>
                              <div sectioned>
                                <img alt='Profile' src={modalData.userPic} style={{ height: "150px", borderRadius: "50%" }} name={name} />
                              </div>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 6 }}>
                              <div title="Profile" sectioned>
                                <div style={{ marginTop: "20px" }}>
                                  <div style={{ fontSize: "25px" }}>ID
                                    <span style={{ fontSize: "25px", marginLeft: "12px" }}><b>{modalData.id}</b></span>
                                  </div>
                                  <div style={{ marginTop: "13px" }}>
                                    <span style={{ fontSize: "25px" }}>{modalData.userType}</span>
                                    <span style={{ fontSize: "25px", marginLeft: "12px" }}><b>{modalData.name}</b></span>
                                  </div>
                                  <div style={{ marginTop: "16px" }}>
                                    <Button size="slim" url={modalData.userUrl}>View Profile</Button>
                                  </div>
                                </div>
                              </div>
                            </Grid.Cell>
                          </Grid>
                          <p>
                            Use GitHub posts to share your products with millions of
                            people. Let shoppers buy from your store without leaving
                            Github.
                          </p>
                        </TextContainer>
                      </Modal.Section>
                    </Modal>
                  </div>
                </ResourceList.Item>
              );
            }
            }
          />
          <ResourceList
            resourceName={{ singular: 'customer', plural: 'customers' }}
            items={[{}]}
            renderItem={(item) => {
              return (
                <ResourceItem
                >
                  {notFound}
                </ResourceItem>
              );
            }}
          />
        </Card>
      </Page>
    </>
  );
}
export default Home;