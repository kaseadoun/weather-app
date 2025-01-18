const monthConversion = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export function formatDate(date: string): string {
    const preformatDate: string[] = date.split("-");

    console.log(preformatDate);

    const reformattedDate: string = `${monthConversion[preformatDate[1]]} ${preformatDate[2]}, ${preformatDate[0]}`;

  return reformattedDate;
}
