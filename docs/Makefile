# Makefile
# TODO: Missing artifacts should be added to this file
.PHONY:	SRS

all:	SRS SoftArch SoftDetail SystDes PS VnVP VnVR DevP HazA Refl UGde

SRS:
	cd SRS && make && cd ..

SoftArch:
	cd Design/SoftArchitecture && make && cd ../..

SoftDetail:
	cd Design/SoftDetailedDes && make && cd ../..

SystDes:
	cd Design/SystDesign && make && cd ../..

PS:
	cd ProblemStatementAndGoals && make && cd ..

VnVP:
	cd VnVPlan && make && cd ../..

VnVR:
	cd VnVReport && make && cd ../..
	
DevP:
	cd DevelopmentPlan && make && cd ../..
	
HazA:
	cd HazardAnalysis && make && cd ../..
	
Refl:
	cd Reflection && make && cd ../..
	
UGde:
	cd UserGuide && make && cd ../..

clean:	cleanSRS cleanSoftArch cleanSoftDetail cleanSystDes cleanPS cleanVnVP cleanVnVR cleanDevP cleanHazA cleanRefl cleanUGde

cleanPS:
	cd ProblemStatementAndGoals && make clean && cd ..

cleanSRS:
	cd SRS && make clean && cd ..

cleanSoftArch:
	cd Design/SoftArchitecture && make clean && cd ../..

cleanSoftDetail:
	cd Design/SoftDetailedDes && make clean && cd ../..

cleanSystDes:
	cd Design/SystDesign && make clean && cd ../..

cleanVnVP:
	cd VnVPlan && make clean && cd ..

cleanVnVR:
	cd VnVReport && make clean && cd ..
	
cleanDevP:
	cd DevelopmentPlan && make clean && cd ..
	
cleanHazA:
	cd HazardAnalysis && make clean && cd ..
	
cleanRefl:
	cd Reflection && make clean && cd ..
	
cleanUGde:
	cd UserGuide && make clean && cd ..
