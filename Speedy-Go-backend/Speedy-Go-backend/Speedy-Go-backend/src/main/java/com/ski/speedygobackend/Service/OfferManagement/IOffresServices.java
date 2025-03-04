package com.ski.speedygobackend.Service.OfferManagement;

import com.ski.speedygobackend.DTO.offresDetailsDTO;
import com.ski.speedygobackend.Entity.OfferManagement.Offres;

import java.util.List;

public interface IOffresServices {

    Offres addOffre(Offres offre , Long idStore);
    List<offresDetailsDTO> retrieveAllOffres();
    Offres retrieveOffre(Long idOffre);
    void removeOffre(Long idOffre);
    Offres updateOffre(Offres offre);


}
