import { 
  Button,
  Container,
  Header,
  Icon,
  Modal,
  Statistic,
} from "semantic-ui-react";
import {useState, useEffect, useRef} from 'react'

export default function Timer(props) {
  const [days, setDays] = useState('0')
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')

  const [open, setOpen] = useState(false)

  const refTimerID = useRef()
  const isCountdown = useRef(false)

  const dt = new Date(`${props.days}T${props.time}:00`)

  const countdown = () => {
    const newTimeLeft = Math.floor((dt - Date.now()) / 1000)
    if (newTimeLeft < 0) {
      clearInterval(refTimerID.current)
      setOpen(true)
      isCountdown.current = false
      return
    }

    setDays(Math.floor(newTimeLeft / (60 * 60 * 24)))
    setHour(Math.floor(newTimeLeft / (60 * 60)) % 24)
    setMinute(Math.floor(newTimeLeft / 60) % 60)
    setSecond(newTimeLeft % 60)
  }

  useEffect(() => {
    if (isCountdown.current) {
      refTimerID.current = setInterval(() => countdown(), 1000)
    } else {
      isCountdown.current = true
    }
    return () => {
      clearInterval(refTimerID.current)
    }
  }, [isCountdown.current, props.eventname, props.days, props.time])
  
  return (
    <Container>
      <Modal
        basic
        open={open}>
          <Header icon>
            <Icon name="alarm" />
            alarm!
          </Header>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)
            } content="OK" />
          </Modal.Actions>
      </Modal>

      <Statistic.Group widths="4" size="tiny">
        <Statistic>
          <Statistic.Value>{('000' + days).slice(-3)}</Statistic.Value>
          <Statistic.Label>Days</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{('00' + hour).slice(-2)}</Statistic.Value>
          <Statistic.Label>Hour</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{('00' + minute).slice(-2)}</Statistic.Value>
          <Statistic.Label>Minute</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{('00' + second).slice(-2)}</Statistic.Value>
          <Statistic.Label>Second</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Container>
  )
}