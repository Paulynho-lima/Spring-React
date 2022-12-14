package com.devsuperior.dsmeta.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;
import com.devsuperior.dsmeta.services.SaleService;
import com.devsuperior.dsmeta.services.SmsService;



@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService service;
	
	@Autowired
	private SmsService smsService;
	

	@Autowired /* Esse marcação é o IC/Cd ou CDI Injeção*/
	private SaleRepository repository; 
	
	
	@GetMapping
	public Page<Sale> findSeles(
			@RequestParam(value="minDate", defaultValue = "") String minDate, 
			@RequestParam(value="maxDate", defaultValue = "")String maxDate,
			Pageable pageable){
		return service.findSales(minDate, maxDate, pageable);
		
	}
	
	@GetMapping("/{id}/notification")
	public void notifySms(@PathVariable Long id) {
		smsService.sendSms(id);
	}
	
	@PostMapping("/saleSave")
	@ResponseBody
	public ResponseEntity<Sale> save (@RequestBody Sale sale) {
		
		Sale sales = repository.save(sale);
		
		return new ResponseEntity<Sale>(sales, HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/{id}/delete")
	/*@ResponseBody  descrição da resposta e requisita o id pelo Multipart Form*/
	public ResponseEntity<String > delete(@PathVariable Long id) {
		
		repository.deleteById(id);
		try {
			return new ResponseEntity<String>("Sale com Id " + id +" deletado com sucesso", HttpStatus.OK);
		}catch(Exception e) {
	
			return  new ResponseEntity<String>("Ops deu erro Interno favor verificar sua API" , HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		
	}
	
	@PutMapping("/update")
	@ResponseBody
	public ResponseEntity<?> update (@RequestBody Sale sale) {
		
		if(sale.getId() == null ||  sale.getId() == ' '){
			return new ResponseEntity<String>("Informe um ID valido para atualização!", HttpStatus.NOT_FOUND);
		}
		
		Sale sales = repository.save(sale);
		
		return new ResponseEntity<Sale>(sales, HttpStatus.CREATED);
		
	}
}
