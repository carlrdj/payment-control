import trae from 'trae'
import configService from './config'

const paymentControlService = trae.create({
	baseUrl: configService.apiUrl
})

export default paymentControlService
