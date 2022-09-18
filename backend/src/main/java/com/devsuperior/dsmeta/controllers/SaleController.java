package com.devsuperior.dsmeta.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
}
