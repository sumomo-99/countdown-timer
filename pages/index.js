import {
  Container,
  Form,
  Segment,
} from 'semantic-ui-react'
import {useState} from 'react'
import Timer from '../components/Timer'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [eventname, setEventname] = useState('')
  const [days, setDays] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e) => {
      setEventname(e.target[0].value)
      setDays(e.target[1].value)
      e.target[2].value ? setTime(e.target[2].value) : setTime('00:00')
  }

  return (
    <div>
      <Container>
        <Segment.Group horizontal>
          <Segment>{eventname}</Segment>
          <Segment>{days}</Segment>
          <Segment>{time}</Segment>
        </Segment.Group>
      </Container>

      <Timer eventname={eventname} days={days} time={time} />
      
      <Container className={styles.event}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Input
            label="Event Name"
            required
            placeholder="e.g. xxx's birth day"
          />
          <Form.Input
            className={styles.dateform}
            type="date"
            label="Date"
            required
          />
          <Form.Input
            className={styles.timeform}
            type="time"
            label="Time"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>

    </div>
  )
}