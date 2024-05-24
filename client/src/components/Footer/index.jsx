import React from 'react'
import styles  from './index.module.scss'
import {Row, Col} from 'antd'

const Footer = () => {
  return (
    <>
    <footer>
      <div id={styles.footer}>
        <div className="container">
          <div className={styles.footer}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

          <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
            <h3>Contact Us</h3>
            <ul>
              <li> 8th floor, 379 Hudson St, New York, NY 10018</li>
              <li> (+1) 96 716 6879</li>
              <li> contact@site.com</li>
            </ul>
          </Col>

          <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
            <h3>LATEST TWITTER</h3>
            <ul>
              <li>Activello is a good option. It has a slider built into that displays the featured image in the slider.</li>
              <li>Activello is a good option. It has a slider built into that displays https://buff.ly/2zaSfAQ</li>
            </ul>
          </Col>

          <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
            <h3>GALLERY</h3>

          </Col>
          
          </Row>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer