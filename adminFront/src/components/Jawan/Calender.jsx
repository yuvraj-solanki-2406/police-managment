import React, { useState } from 'react';

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarDates = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const totalDays = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const dates = [];
        for (let i = 1; i <= totalDays; i++) {
            dates.push(i);
        }
        for (let i = 0; i < firstDay; i++) {
            dates.unshift('');
        }
        return dates;
    };

    const goToPreviousMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    };

    const renderCalendarDates = () => {
        const dates = generateCalendarDates();
        const rows = [];
        let cells = [];

        dates.forEach((day, index) => {
            if (index % 7 === 0 && index !== 0) {
                rows.push(<tr key={index}>{cells}</tr>);
                cells = [];
            }
            cells.push(<td key={index}>{day}</td>);
        });

        // Push remaining cells into the last row
        if (cells.length > 0) {
            rows.push(<tr key={dates.length}>{cells}</tr>);
        }

        return rows;
    };

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-center align-items-center mb-3">
                {/* <button className="btn btn-primary" onClick={goToPreviousMonth}>Previous Month</button> */}
                <h2>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                {/* <button className="btn btn-primary" onClick={goToNextMonth}>Next Month</button> */}
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Sun</th>
                        <th scope="col">Mon</th>
                        <th scope="col">Tue</th>
                        <th scope="col">Wed</th>
                        <th scope="col">Thu</th>
                        <th scope="col">Fri</th>
                        <th scope="col">Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCalendarDates()}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary" onClick={goToPreviousMonth}>Previous Month</button>
                <button className="btn btn-primary" onClick={goToNextMonth}>Next Month</button>
            </div>
        </div>
    );
};

export default Calendar;
