import React, { useState } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa"
import style from './calendar.module.css' // для стилей
const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const today = new Date()

	const Massdays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wensday',
		'Thursday',
		'Friday',
		'Saturday'
	]

	let todayDayWeek = today.getDay()
	let todayDay = today.getDate()

	const renderCalendar = (date) => {
		const year = date.getFullYear()
		const month = date.getMonth()

		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)
		const daysInMonth = lastDay.getDate()
		const days = []

		// Заполнение пустых ячеек до начала месяца
		const firstDayOfWeek = firstDay.getDay() // Получаем день недели (0 - воскресенье)
		const daysInPrevMonth = new Date(year, month, 0).getDate()

		// Добавление дней из предыдущего месяца
		const startDay = (firstDayOfWeek + 1) % 7 // Начинаем с понедельника
		for (let i = startDay; i > 0; i--) {
			days.push(
				<div className={style.nonCurrentMonth} key={`prev-${i}`}>
					{daysInPrevMonth - i + 1}
				</div>
			)
		}

		// Заполнение дней текущего месяца
		for (let day = 1; day <= daysInMonth; day++) {
			const isToday =
				day === today.getDate() &&
				month === today.getMonth() &&
				year === today.getFullYear()

			days.push(
				<div className={isToday ? style.today : style.date} key={day}>
					{day}
				</div>
			)
		}

		// Добавляем дни из следующего месяца
		const remainingDays = 42 - days.length // Всего ячеек в календаре 42
		for (let day = 1; day <= remainingDays; day++) {
			days.push(
				<div className={style.nonCurrentMonth} key={`next-${day}`}>
					{day}
				</div>
			)
		}

		return {
			monthYear: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
			days,
		}
	}

	const { monthYear, days } = renderCalendar(currentDate)

	const handlePrev = () => {
		setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
	}

	const handleNext = () => {
		setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
	}

	return (
		<div className='App'>
			<div className='FullCalendar'>
				<div className='LeftDateKysok'>
					<div className='DateKysokBykvi'>
						<h3>{Massdays[todayDayWeek + 1]}</h3>
						<p>{todayDay}</p>
					</div>
				</div>
				<div className={style.calendar}>
					<div className={style.header}>
						<button onClick={handlePrev}><FaChevronCircleLeft /></button>
						<h2>{monthYear}</h2>
						<button onClick={handleNext}><FaChevronCircleRight /></button>
					</div>
					<div className={style.days}>
						{Massdays.map((item, ind) => {
							return <div className={style.day_name} key={ind}>{item.substring(0, 2)}</div>
						})}
					</div>
					<div className={style.dates}>
						{days}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calendar
