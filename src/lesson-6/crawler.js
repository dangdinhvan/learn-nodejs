const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const numberQuestionPerExam = 35;

const getAllExamLink = async () => {
	const webData = await axios.get(
		' https://vnexpress.net/interactive/2016/thi-sat-hach-lai-xe'
	);

	const $ = cheerio.load(webData.data);

	const examLinks = [];

	$('.top_dethi').each((_, element) => {
		const testUrlLink =
			'https://vnexpress.net' + $(element).find('a').attr('href');
		examLinks.push(testUrlLink);
	});

	return examLinks;
};

const getData = async () => {
	const examLinks = await getAllExamLink();

	// Hàm random số thời gian gọi request
	const randomSleep = () => {
		const randomTime = Math.floor(Math.random() * 4) + 2;
		return new Promise(resolve => setTimeout(resolve, randomTime * 1000));
	};

	const examsData = [];

	// Hàm lấy dữ liệu đề thi
	const getAllExamData = async () => {
		for (let i = 0; i < examLinks.length; i++) {
			const examName = `Đề ${i + 1}`;
			const examQuestions = [];

			for (let j = 0; j < numberQuestionPerExam; j++) {
				const webData = await axios.get(examLinks[i]);

				const $ = cheerio.load(webData.data);

				const answers = [];

				let paralysisPoint = false;

				if (j === 9) {
					paralysisPoint = true;
				}

				$(`#question_${j + 1} .noidung_dapan span`).each(
					(index, element) =>
						answers.push({
							id: index,
							content: $(element).text().trim()
						})
				);

				const getQuestionImage = () => {
					const image = $(`#question_${j + 1} .noidung_cauhoi`).find(
						'img'
					);

					if (image.length > 0) {
						return $(`#question_${j + 1} .noidung_cauhoi`)
							.find('img')
							.attr('src');
					}
					return null;
				};

				examQuestions.push({
					id: j,
					questionContent: $(`#question_${j + 1} .noidung_cauhoi`)
						.text()
						.trim(),
					questionImage: getQuestionImage(),
					answers: answers,
					paralysisPoint: paralysisPoint
				});
			}

			const examObj = {
				id: i,
				name: examName,
				examQuestions: examQuestions
			};

			examsData.push(examObj);

			await randomSleep();
		}

		fs.writeFileSync('database.json', JSON.stringify(examsData));
	};

	getAllExamData();
};

getData();
