import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "../components/Headers/Header.js";

const  cool = [
    {
        name: 'Argon Design System',
        status: 'pending'
    },
    {
        name: 'Argon Design System',
        status: 'pending'
    }
]


class Group extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: cool
        }
    }

    groupLister(data){
        cool.map((item,i) => {
                return(
                    <tr>
                    <th scope="row">
                        <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                            <img
                            alt="..."
                            src={require("../assets/img/theme/bootstrap.jpg")}
                            />
                        </a>
                        <Media>
                            <span className="mb-0 text-sm">
                            {item.name}
                            </span>
                        </Media>
                        </Media>
                    </th>
                    <td>
                        <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                        </Badge>
                    </td>
                    <td>
                    </td>
                    <td className="text-right">
                        <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            >
                            Action
                            </DropdownItem>
                            <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            >
                            Another action
                            </DropdownItem>
                            <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            >
                            Something else here
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                    </tr>
                )
        })
    }


  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Groups</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Members</th>
                      {/* <th scope="col">Budget</th> */}
                      <th scope="col">Status</th>
                      {/* <th scope="col">Users</th> */}
                      {/* <th scope="col">Completion</th> */}
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.groupLister(this.state.data)}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Group;
